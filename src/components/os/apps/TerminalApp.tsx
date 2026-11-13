'use client';

import type { FormEvent, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { HeroPortraitSlot } from '@/components/home/HeroPortraitSlot';
import { useDesktop } from '@/components/os/DesktopContext';
import {
  CONTACT_PAGE_DATA,
  PROJECT_RECORDS,
  SITE_IDENTITY,
} from '@/data/portfolio';
import type { OsAppId, ProjectsSubView, VirtualDirNode } from '@/data/rishiOs';
import {
  getWallpaperConfig,
  OS_WALLPAPERS,
  resolveVirtualPath,
  toDisplayTildePath,
  VIRTUAL_FS,
  VIRTUAL_ROOT,
} from '@/data/rishiOs';
import styles from './TerminalApp.module.css';

interface TerminalLine {
  text: string;
  tone?: 'normal' | 'accent' | 'error';
}

interface TerminalEntry {
  id: number;
  promptPath: string;
  command: string;
  kind?: 'standard' | 'neofetch' | 'matrix';
  lines: readonly TerminalLine[];
}

const NEOFETCH_SPECS: readonly { label: string; value: string }[] = [
  { label: 'OS', value: 'RISHI OS v1.0.0' },
  { label: 'Host', value: `${SITE_IDENTITY.fullName} (B.Tech CSE)` },
  { label: 'Shell', value: 'rishi-sh (virtual)' },
  { label: 'DE', value: 'RISHI Desktop' },
  { label: 'WM', value: 'Floating' },
  { label: 'Theme', value: 'Midnight Blue + Cyan' },
  { label: 'Icons', value: 'Custom SVG' },
  { label: 'Scope', value: '/home/rishi (read-only)' },
];

const SUPPORTED_COMMANDS = [
  'neofetch',
  'cmatrix',
  'matrix',
  'sudo',
  'theme',
  'wallpaper',
  'resume',
  'help',
  'whoami',
  'pwd',
  'ls',
  'cd',
  'cat',
  'open',
  'projects',
  'contact',
  'tree',
  'echo',
  'history',
  'date',
  'clear',
  'logout',
  'exit',
] as const;

const OPEN_TARGETS: Record<
  string,
  { appId: OsAppId; projectSubView?: ProjectsSubView; label: string }
> = {
  welcome: { appId: 'home', label: 'Welcome' },
  home: { appId: 'home', label: 'Welcome' },
  projects: { appId: 'projects', projectSubView: 'directory', label: 'Projects' },
  dormiq: { appId: 'projects', projectSubView: 'dormiq', label: 'DormiQ Case Study' },
  assignflow: { appId: 'projects', projectSubView: 'assignflow', label: 'AssignFlow' },
  lifeos: { appId: 'projects', projectSubView: 'lifeos', label: 'LifeOS' },
  finora: { appId: 'projects', projectSubView: 'finora', label: 'Finora' },
  complaint: {
    appId: 'projects',
    projectSubView: 'complaint-management-system',
    label: 'Complaint Management System',
  },
  blog: { appId: 'projects', projectSubView: 'blog-project', label: 'Blog Project' },
  about: { appId: 'about', label: 'About' },
  journey: { appId: 'journey', label: 'Journey' },
  skills: { appId: 'skills', label: 'Skills' },
  contact: { appId: 'contact', label: 'Contact' },
  files: { appId: 'files', label: 'File Manager' },
};

function buildTreeLines(
  dirPath: string,
  prefix = ''
): TerminalLine[] {
  const node = VIRTUAL_FS[dirPath];
  if (!node || node.kind !== 'dir') return [];

  const result: TerminalLine[] = [];
  node.children.forEach((childPath, idx) => {
    const child = VIRTUAL_FS[childPath];
    if (!child) return;
    const isLast = idx === node.children.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    const suffix = child.kind === 'dir' ? '/' : '';
    result.push({
      text: `${prefix}${connector}${child.name}${suffix}`,
      tone: child.kind === 'dir' ? 'accent' : 'normal',
    });

    if (child.kind === 'dir') {
      const nextPrefix = `${prefix}${isLast ? '    ' : '│   '}`;
      result.push(...buildTreeLines(child.path, nextPrefix));
    }
  });
  return result;
}

function formatDetailedLsRow(
  kind: 'dir' | 'file',
  owner: string,
  sizeLabel: string,
  displayName: string
): string {
  const perms = kind === 'dir' ? 'drwxr-xr-x' : '-r--r--r--';
  const paddedSize = sizeLabel.padStart(7, ' ');
  return `${perms}  ${owner}  ${paddedSize}  ${displayName}`;
}

function getAutocompleteCandidate(cwd: string, rawToken: string, isFirstToken: boolean): string | null {
  if (isFirstToken) {
    const cmdMatch = SUPPORTED_COMMANDS.find((cmd) =>
      cmd.toLowerCase().startsWith(rawToken.toLowerCase())
    );
    return cmdMatch ?? null;
  }

  // Match app aliases + relative/absolute virtual filesystem paths dynamically
  const lastSlash = rawToken.lastIndexOf('/');
  const dirPart = lastSlash >= 0 ? rawToken.slice(0, lastSlash + 1) : '';
  const namePrefix = lastSlash >= 0 ? rawToken.slice(lastSlash + 1) : rawToken;

  const parentPath =
    dirPart === ''
      ? cwd
      : dirPart === '/'
        ? VIRTUAL_ROOT
        : resolveVirtualPath(cwd, dirPart.slice(0, -1) || '~');

  if (parentPath && VIRTUAL_FS[parentPath]?.kind === 'dir') {
    const dirNode = VIRTUAL_FS[parentPath] as VirtualDirNode;
    for (const childPath of dirNode.children) {
      const child = VIRTUAL_FS[childPath];
      if (!child) continue;
      if (child.name.toLowerCase().startsWith(namePrefix.toLowerCase())) {
        return `${dirPart}${child.name}${child.kind === 'dir' ? '/' : ''}`;
      }
    }
  }

  if (!dirPart) {
    const aliasMatch = Object.keys(OPEN_TARGETS).find((alias) =>
      alias.startsWith(rawToken.toLowerCase())
    );
    if (aliasMatch) return aliasMatch;
  }

  return null;
}

function TerminalMatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = Math.min(canvas.parentElement?.clientWidth || 640, 800));
    const height = (canvas.height = 180);
    const fontSize = 13;
    const columns = Math.floor(width / fontSize);
    const drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -15));
    const chars = '01RISHIOS79ABCDEF<>/{}+*~#';

    let lastTime = 0;
    const interval = 1000 / 24;

    const render = (time: number) => {
      animId = requestAnimationFrame(render);
      if (time - lastTime < interval) return;
      lastTime = time;

      ctx.fillStyle = 'rgba(7, 19, 34, 0.2)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)] ?? '0';
        const x = i * fontSize;
        const currentDrop = drops[i] ?? 0;
        const y = currentDrop * fontSize;

        if (y >= 0 && y <= height) {
          ctx.fillStyle = '#ffffff';
          ctx.fillText(char, x, y);

          ctx.fillStyle = i % 3 === 0 ? '#55c7e8' : i % 3 === 1 ? '#2878ed' : '#79ddf3';
          ctx.fillText(char, x, y - fontSize);
        }

        if (y > height && Math.random() > 0.96) {
          drops[i] = 0;
        } else {
          drops[i] = currentDrop + 1;
        }
      }
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      style={{
        margin: '10px 0',
        borderRadius: '6px',
        overflow: 'hidden',
        border: '1px solid rgba(85, 199, 232, 0.3)',
        background: '#071322',
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '180px' }} />
      <div
        style={{
          padding: '4px 10px',
          fontSize: '0.72rem',
          color: '#55c7e8',
          fontFamily: 'monospace',
          background: 'rgba(7, 19, 34, 0.9)',
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(85, 199, 232, 0.15)',
        }}
      >
        <span>CMATRIX // DIGITAL STREAM</span>
        <span>RISHI OS SHELL</span>
      </div>
    </div>
  );
}

/**
 * Controlled simulated RISHI OS virtual terminal sharing the centralized /home/rishi filesystem.
 */
export function TerminalApp() {
  const {
    openApp,
    openLogoutDialog,
    setFilesTargetPath,
    isMobile,
    wallpaperId,
    setWallpaperId,
  } = useDesktop();
  const [cwd, setCwd] = useState<string>(VIRTUAL_ROOT);
  const [inputValue, setInputValue] = useState('');
  const [entries, setEntries] = useState<TerminalEntry[]>([
    {
      id: 0,
      promptPath: '~',
      command: 'neofetch',
      kind: 'neofetch',
      lines: [],
    },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const entryIdRef = useRef<number>(1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollEndRef = useRef<HTMLDivElement | null>(null);

  const promptTilde = toDisplayTildePath(cwd);
  const promptPrefix = `rishi@rishi-os:${promptTilde}$`;

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [entries]);

  const executeCommand = (rawCommand: string) => {
    const trimmed = rawCommand.trim();
    const currentPromptPath = toDisplayTildePath(cwd);

    if (!trimmed) {
      setEntries((prev) => [
        ...prev,
        {
          id: entryIdRef.current++,
          promptPath: currentPromptPath,
          command: '',
          lines: [],
        },
      ]);
      return;
    }

    const parts = trimmed.split(/\s+/);
    const cmd = (parts[0] ?? '').toLowerCase();
    const args = parts.slice(1);
    const firstArg = args[0];

    setHistory((prev) => [trimmed, ...prev.slice(0, 49)]);
    setHistoryIndex(-1);

    if (cmd === 'clear') {
      setEntries([]);
      return;
    }

    if (cmd === 'neofetch') {
      setEntries((prev) => [
        ...prev,
        {
          id: entryIdRef.current++,
          promptPath: currentPromptPath,
          command: trimmed,
          kind: 'neofetch',
          lines: [],
        },
      ]);
      return;
    }

    if (cmd === 'cmatrix' || cmd === 'matrix') {
      setEntries((prev) => [
        ...prev,
        {
          id: entryIdRef.current++,
          promptPath: currentPromptPath,
          command: trimmed,
          kind: 'matrix',
          lines: [],
        },
      ]);
      return;
    }

    let responseLines: TerminalLine[] = [];

    switch (cmd) {
      case 'help':
        responseLines = [
          { text: 'Supported virtual shell commands:', tone: 'accent' },
          { text: '  neofetch             Display workspace info and particle skeleton' },
          { text: '  cmatrix / matrix     Stream cyber digital matrix rain' },
          { text: '  sudo <command>       Execute with elevated developer privileges' },
          { text: '  theme [name]         Switch desktop wallpaper on the fly' },
          { text: '  resume               Display Rishi Jha software developer CV' },
          { text: '  help                 Show available commands and shortcuts' },
          { text: '  whoami               Display current virtual shell user' },
          { text: '  pwd                  Print current virtual directory' },
          { text: '  ls [-la] [path]      List directory contents (detailed with -l / -la)' },
          { text: '  cd <path>            Change directory (supports .., ~, relative & absolute)' },
          { text: '  cat <file>           Display file contents from /home/rishi' },
          { text: '  open <target>        Open file or RISHI OS app window' },
          { text: '  projects             Show confirmed portfolio projects' },
          { text: '  contact              Show contact status & channels' },
          { text: '  tree [path]          Print directory tree under /home/rishi' },
          { text: '  echo <text>          Print plain text message' },
          { text: '  history              Show commands executed in this session' },
          { text: '  date                 Show current system date & time' },
          { text: '  clear                Clear terminal output (or press Ctrl+L)' },
          { text: '  logout / exit        End RISHI OS desktop session' },
        ];
        break;

      case 'sudo': {
        const rest = args.join(' ').toLowerCase();
        if (rest.includes('hire')) {
          openApp('contact');
          responseLines = [
            { text: '[sudo] Access level: RECRUITER_CONFIRMED', tone: 'accent' },
            { text: 'Initiating direct recruitment sequence...', tone: 'normal' },
            { text: 'Opening Contact composer window...', tone: 'accent' },
          ];
        } else if (rest.includes('rm')) {
          responseLines = [
            { text: "[sudo] rm: cannot remove '/': Permission denied", tone: 'error' },
            { text: 'System integrity: /home/rishi is mounted in READ-ONLY mode.', tone: 'accent' },
            { text: 'Nice try! Rishi Jha portfolio filesystem is immutable.', tone: 'normal' },
          ];
        } else {
          responseLines = [
            {
              text: `[sudo] user 'rishi' is not in the sudoers file. This incident will be reported to Rishi Jha.`,
              tone: 'error',
            },
          ];
        }
        break;
      }

      case 'theme':
      case 'wallpaper': {
        const themeArg = (args[0] || '').toLowerCase();
        if (!themeArg) {
          responseLines = [
            { text: `Current wallpaper: ${getWallpaperConfig(wallpaperId).name}`, tone: 'accent' },
            { text: 'Available wallpapers:', tone: 'normal' },
            ...OS_WALLPAPERS.map((w) => ({
              text: `  ${w.id.padEnd(20)} ${w.name} (${w.category})`,
            })),
            { text: 'Usage: theme <name> (e.g. theme cyber-grid, theme deep-space)', tone: 'accent' },
          ];
        } else {
          const match = OS_WALLPAPERS.find(
            (w) =>
              w.id.toLowerCase() === themeArg ||
              w.name.toLowerCase().includes(themeArg) ||
              w.shortName.toLowerCase() === themeArg
          );
          if (match) {
            setWallpaperId(match.id);
            responseLines = [
              { text: `Desktop wallpaper switched to "${match.name}".`, tone: 'accent' },
              { text: `Theme: ${match.category} — ${match.description}`, tone: 'normal' },
            ];
          } else {
            responseLines = [
              { text: `Unknown wallpaper theme "${args[0]}".`, tone: 'error' },
              { text: 'Run "theme" to view available wallpapers.', tone: 'normal' },
            ];
          }
        }
        break;
      }

      case 'resume': {
        responseLines = [
          { text: '=======================================================', tone: 'accent' },
          { text: '  RISHI JHA — SOFTWARE DEVELOPER CURRICULUM VITAE', tone: 'accent' },
          { text: '=======================================================', tone: 'accent' },
          { text: 'Education:', tone: 'accent' },
          { text: '  • B.Tech in Computer Science & Engineering (2022–2025) — DCE Gurugram' },
          { text: '  • Diploma in Mechanical Engineering (2018–2021) — G.B. Pant Institute' },
          { text: 'Core Stack:', tone: 'accent' },
          { text: '  • Python, FastAPI, Next.js, React, TypeScript, PostgreSQL, Docker' },
          { text: 'Featured Work:', tone: 'accent' },
          { text: '  • DormiQ (formerly SmartHostel AI) — Case Study & Resident Dossiers' },
          { text: '  • AssignFlow, LifeOS, Finora' },
          { text: 'Honors:', tone: 'accent' },
          { text: '  • Cheque Mate Hackathon Finalist (Top 3)' },
          { text: '-------------------------------------------------------' },
          { text: 'Tip: Open Desktop shortcut "Resume.md" or run "open contact".', tone: 'accent' },
        ];
        break;
      }

      case 'whoami':
        responseLines = [
          { text: 'rishi', tone: 'accent' },
          {
            text: `${SITE_IDENTITY.fullName} (${SITE_IDENTITY.initials}) — ${SITE_IDENTITY.rolePlaceholder}`,
          },
        ];
        break;

      case 'pwd':
        responseLines = [{ text: cwd, tone: 'accent' }];
        break;

      case 'date':
        responseLines = [{ text: new Date().toString() }];
        break;

      case 'echo': {
        const rawRest = trimmed.slice(cmd.length).trim();
        const unquoted =
          (rawRest.startsWith('"') && rawRest.endsWith('"')) ||
          (rawRest.startsWith("'") && rawRest.endsWith("'"))
            ? rawRest.slice(1, -1)
            : rawRest;
        responseLines = [{ text: unquoted }];
        break;
      }

      case 'history': {
        if (history.length === 0) {
          responseLines = [{ text: '(no prior commands in session)' }];
        } else {
          const ordered = [...history].reverse();
          responseLines = ordered.map((item, idx) => ({
            text: `${String(idx + 1).padStart(3, ' ')}  ${item}`,
          }));
        }
        break;
      }

      case 'projects': {
        responseLines = [
          { text: `Portfolio Projects (${PROJECT_RECORDS.length}):`, tone: 'accent' },
          ...PROJECT_RECORDS.map((proj) => ({
            text: `  [${proj.index}] ${proj.title} (${proj.route}) — ${proj.statusTag}`,
          })),
          { text: 'Tip: run "cd Projects/DormiQ && cat README.md" or "open dormiq" / "open assignflow".' },
        ];
        break;
      }

      case 'contact': {
        responseLines = [
          { text: `Contact // ${CONTACT_PAGE_DATA.headingAccent}`, tone: 'accent' },
          { text: CONTACT_PAGE_DATA.availabilityNote },
          { text: CONTACT_PAGE_DATA.verificationNotice },
          ...CONTACT_PAGE_DATA.channels.map((ch) => ({
            text: `  - ${ch.label}: ${ch.statusLabel}`,
          })),
        ];
        break;
      }

      case 'ls': {
        let showHidden = false;
        let showLong = false;
        let pathArg: string | undefined;
        let badFlag: string | undefined;

        for (const token of args) {
          if (token.startsWith('-') && token.length > 1) {
            for (const ch of token.slice(1)) {
              if (ch === 'l') showLong = true;
              else if (ch === 'a') showHidden = true;
              else badFlag = `-${ch}`;
            }
          } else if (!pathArg) {
            pathArg = token;
          }
        }

        if (badFlag) {
          responseLines = [
            { text: `ls: invalid option '${badFlag}' (supported: -l, -a, -la)`, tone: 'error' },
          ];
          break;
        }

        const targetPath = pathArg ? resolveVirtualPath(cwd, pathArg) : cwd;
        const targetNode = targetPath ? VIRTUAL_FS[targetPath] : undefined;

        if (!targetNode) {
          responseLines = [
            {
              text: `ls: cannot access '${pathArg ?? ''}': No such file or directory`,
              tone: 'error',
            },
          ];
        } else if (targetNode.kind === 'file') {
          responseLines = [
            showLong
              ? { text: formatDetailedLsRow('file', 'rishi', targetNode.sizeLabel, targetNode.name) }
              : { text: targetNode.name },
          ];
        } else if (showLong) {
          const rows: TerminalLine[] = [];
          if (showHidden) {
            rows.push({
              text: formatDetailedLsRow('dir', 'rishi', 'DIR', '.'),
              tone: 'accent',
            });
            rows.push({
              text: formatDetailedLsRow('dir', 'rishi', 'DIR', '..'),
              tone: 'accent',
            });
          }
          for (const childPath of targetNode.children) {
            const child = VIRTUAL_FS[childPath];
            if (!child) continue;
            rows.push({
              text: formatDetailedLsRow(
                child.kind,
                'rishi',
                child.kind === 'dir' ? 'DIR' : child.sizeLabel,
                child.kind === 'dir' ? `${child.name}/` : child.name
              ),
              tone: child.kind === 'dir' ? 'accent' : 'normal',
            });
          }
          responseLines = rows.length > 0 ? rows : [{ text: '(empty directory)' }];
        } else {
          const items: string[] = [];
          if (showHidden) items.push('./', '../');
          for (const childPath of targetNode.children) {
            const child = VIRTUAL_FS[childPath];
            if (child) items.push(child.kind === 'dir' ? `${child.name}/` : child.name);
          }
          responseLines = [
            { text: items.join('   ') || '(empty)', tone: 'accent' },
          ];
        }
        break;
      }

      case 'tree': {
        const targetPath = firstArg ? resolveVirtualPath(cwd, firstArg) : cwd;
        const targetNode = targetPath ? VIRTUAL_FS[targetPath] : undefined;
        if (!targetNode) {
          responseLines = [
            {
              text: `tree: '${firstArg ?? ''}': No such file or directory`,
              tone: 'error',
            },
          ];
        } else if (targetNode.kind === 'file') {
          responseLines = [{ text: targetNode.name }];
        } else {
          responseLines = [
            { text: toDisplayTildePath(targetNode.path), tone: 'accent' },
            ...buildTreeLines(targetNode.path),
          ];
        }
        break;
      }

      case 'cd': {
        const nextPath = resolveVirtualPath(cwd, firstArg ?? '~');
        const nextNode = nextPath ? VIRTUAL_FS[nextPath] : undefined;

        if (!nextPath || !nextNode) {
          const outOfSandbox =
            firstArg?.startsWith('..') && cwd === VIRTUAL_ROOT;
          responseLines = [
            {
              text: outOfSandbox
                ? `cd: already at virtual workspace root ${VIRTUAL_ROOT}`
                : `bash: cd: ${firstArg}: No such file or directory`,
              tone: outOfSandbox ? 'accent' : 'error',
            },
          ];
        } else if (nextNode.kind !== 'dir') {
          responseLines = [
            { text: `bash: cd: ${firstArg}: Not a directory`, tone: 'error' },
          ];
        } else {
          setCwd(nextPath);
          responseLines = [{ text: nextPath, tone: 'accent' }];
        }
        break;
      }

      case 'cat': {
        if (!firstArg) {
          responseLines = [
            { text: 'cat: missing file operand (e.g. cat README.md)', tone: 'error' },
          ];
          break;
        }

        const resolved = resolveVirtualPath(cwd, firstArg);
        const node = resolved ? VIRTUAL_FS[resolved] : undefined;

        if (!node) {
          responseLines = [
            { text: `cat: ${firstArg}: No such file or directory`, tone: 'error' },
          ];
        } else if (node.kind === 'dir') {
          responseLines = [
            { text: `cat: ${firstArg}: Is a directory`, tone: 'error' },
          ];
        } else {
          responseLines = [
            { text: `[${node.path}]`, tone: 'accent' },
            ...node.contentLines.map((line) => ({ text: line })),
          ];
        }
        break;
      }

      case 'open': {
        if (!firstArg) {
          responseLines = [
            {
              text: 'open: specify a file, folder, or app (e.g. open README.md, open projects, open about)',
              tone: 'error',
            },
          ];
          break;
        }

        const directAlias = OPEN_TARGETS[firstArg.toLowerCase()];
        if (directAlias) {
          openApp(directAlias.appId, { projectSubView: directAlias.projectSubView });
          responseLines = [
            { text: `Opening ${directAlias.label}...`, tone: 'accent' },
          ];
          break;
        }

        const resolved = resolveVirtualPath(cwd, firstArg);
        const node = resolved ? VIRTUAL_FS[resolved] : undefined;
        if (!node) {
          responseLines = [
            {
              text: `open: '${firstArg}' not found in /home/rishi`,
              tone: 'error',
            },
          ];
          break;
        }

        if (node.kind === 'file') {
          if (node.launchAction) {
            openApp(node.launchAction.appId, {
              projectSubView: node.launchAction.projectSubView,
            });
            responseLines = [
              {
                text: `Opening ${node.name} in ${node.launchAction.label}...`,
                tone: 'accent',
              },
            ];
          } else {
            const parentDir =
              node.path.slice(0, node.path.lastIndexOf('/')) || VIRTUAL_ROOT;
            setFilesTargetPath(parentDir);
            openApp('files', { filesPath: parentDir });
            responseLines = [
              { text: `Opening ${node.name} in File Manager...`, tone: 'accent' },
            ];
          }
        } else {
          setFilesTargetPath(node.path);
          openApp('files', { filesPath: node.path });
          responseLines = [
            { text: `Opening directory ${node.path} in File Manager...`, tone: 'accent' },
          ];
        }
        break;
      }

      case 'logout':
      case 'exit':
        openLogoutDialog();
        responseLines = [
          {
            text: 'Opening RISHI OS session logout confirmation...',
            tone: 'accent',
          },
        ];
        break;

      default:
        responseLines = [
          {
            text: `bash: ${parts[0]}: command not found (type 'help' for supported commands)`,
            tone: 'error',
          },
        ];
        break;
    }

    setEntries((prev) => [
      ...prev,
      {
        id: entryIdRef.current++,
        promptPath: currentPromptPath,
        command: trimmed,
        lines: responseLines,
      },
    ]);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    executeCommand(inputValue);
    setInputValue('');
  };

  const handleInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.ctrlKey && event.key.toLowerCase() === 'l') {
      event.preventDefault();
      setEntries([]);
      return;
    }

    if (event.ctrlKey && event.key.toLowerCase() === 'c') {
      event.preventDefault();
      setEntries((prev) => [
        ...prev,
        {
          id: entryIdRef.current++,
          promptPath: toDisplayTildePath(cwd),
          command: `${inputValue}^C`,
          lines: [],
        },
      ]);
      setInputValue('');
      setHistoryIndex(-1);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (history.length === 0) return;
      const nextIdx = Math.min(history.length - 1, historyIndex + 1);
      setHistoryIndex(nextIdx);
      setInputValue(history[nextIdx] ?? '');
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInputValue('');
        return;
      }
      const nextIdx = historyIndex - 1;
      setHistoryIndex(nextIdx);
      setInputValue(history[nextIdx] ?? '');
    } else if (event.key === 'Tab') {
      event.preventDefault();
      const parts = inputValue.split(/\s+/);
      const isFirstToken = parts.length <= 1;
      const lastToken = parts[parts.length - 1] ?? '';
      if (!lastToken) return;

      const completion = getAutocompleteCandidate(cwd, lastToken, isFirstToken);
      if (completion) {
        parts[parts.length - 1] = completion;
        setInputValue(parts.join(' '));
      }
    }
  };

  return (
    <div className={styles.root}>
      {/* Scrollable Terminal Stage */}
      <div
        className={styles.outputArea}
        onClick={() => inputRef.current?.focus()}
      >
        {entries.map((entry) => (
          <div key={entry.id} className={styles.entryBlock}>
            <div className={styles.promptLine}>
              <span className={styles.promptUser}>rishi@rishi-os</span>
              <span className={styles.promptSep}>:</span>
              <span className={styles.promptPath}>{`${entry.promptPath}$`}</span>
              {entry.command ? (
                <span className={styles.promptCmd}>{entry.command}</span>
              ) : null}
            </div>

            {entry.kind === 'neofetch' ? (
              <div className={styles.neofetchBlock}>
                <div
                  className={styles.neofetchPortrait}
                  aria-label="Interactive cursor-reactive particle skeleton of Rishi Jha"
                >
                  <HeroPortraitSlot
                    animated={!isMobile}
                    variant="terminal"
                    className={styles.portraitCanvas}
                  />
                </div>

                <dl className={styles.neofetchSpecs}>
                  <div className={styles.neofetchHeader}>
                    <dt className={styles.srOnly}>Workspace</dt>
                    <dd className={styles.neofetchTitle}>Rishi OS</dd>
                  </div>
                  {NEOFETCH_SPECS.map((row) => (
                    <div key={row.label} className={styles.neofetchRow}>
                      <dt className={styles.specKey}>{`${row.label}:`}</dt>
                      <dd className={styles.specVal}>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : entry.kind === 'matrix' ? (
              <TerminalMatrixCanvas />
            ) : entry.lines.length > 0 ? (
              <div className={styles.responseLines}>
                {entry.lines.map((line, i) => (
                  <div
                    key={`${entry.id}-${i}`}
                    className={
                      line.tone === 'error'
                        ? styles.lineError
                        : line.tone === 'accent'
                          ? styles.lineAccent
                          : styles.lineNormal
                    }
                  >
                    {line.text}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ))}
        <div ref={scrollEndRef} />
      </div>

      {/* Minimal Live Shell Prompt Input */}
      <form className={styles.inputForm} onSubmit={handleSubmit}>
        <label htmlFor="rishi-os-terminal-input" className={styles.promptPrefix}>
          <span className={styles.promptUser}>rishi@rishi-os</span>
          <span className={styles.promptSep}>:</span>
          <span className={styles.promptPath}>{`${promptTilde}$`}</span>
          <span className={styles.srOnly}>{promptPrefix}</span>
        </label>
        <input
          id="rishi-os-terminal-input"
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="neofetch · help · ls · cd Projects/DormiQ"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          className={styles.cmdInput}
        />
        <button
          type="submit"
          className={styles.runBtn}
          aria-label="Execute command"
          title="Execute command (Enter)"
        >
          ↵
        </button>
      </form>
    </div>
  );
}
