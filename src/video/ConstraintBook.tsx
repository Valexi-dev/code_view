import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import './agent-showcase.css';

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const captions = [
  {at: 0, text: '同一个任务，四种 Agent 工作流'},
  {at: 90, text: 'Codex｜把任务拆开，在隔离工作区推进'},
  {at: 180, text: '修改代码、运行测试，再检查 diff'},
  {at: 300, text: 'TRAE｜IDE 辅助与 SOLO 自主模式'},
  {at: 390, text: '边看代码，边预览页面变化'},
  {at: 510, text: 'DeepSeek Harness｜把 Agent 能力组合成插件'},
  {at: 600, text: '工具、模型、会话与运行模式都可编排'},
  {at: 720, text: 'Claude Code｜在终端里读、改、运行代码'},
  {at: 810, text: '再用 Subagents 与 Hooks 扩展工作流'},
  {at: 930, text: '云端任务 · IDE 工作台 · 可组合 Harness · 终端协作'},
  {at: 1020, text: '按任务与习惯选择，不做绝对排名'},
];

const getOpacity = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, start + 15, end - 15, end], [0, 1, 1, 0], clamp);

const PaperLabel: React.FC<{children: React.ReactNode; accent?: string}> = ({children, accent = '#bd8c4c'}) =>
  <span className="paper-label" style={{'--accent': accent} as React.CSSProperties}>{children}</span>;

const CodeLine: React.FC<{width: number; tone?: string}> = ({width, tone = 'warm'}) =>
  <i className={`code-line ${tone}`} style={{width: `${width}%`}}/>;

const CodexDemo: React.FC<{frame: number}> = ({frame}) => <div className="agent-window codex-window">
  <div className="window-top"><span className="window-dots">● ● ●</span><b>Codex / Task workspace</b><small>3 tasks · isolated workspaces</small></div>
  <div className="codex-body">
    <div className="task-stack">
      {[
        ['01','修复设置页布局','Workspace A','DONE'],
        ['02','补充表单校验测试','Workspace B','TEST'],
        ['03','检查主题切换问题','Workspace C','RUN'],
      ].map(([num,title,workspace,state],i)=><div className={`task-card task-${i}`} key={num} style={{transform:`translateX(${Math.sin(frame/22+i)*5}px)`}}>
        <span className="task-num">{num}</span><strong>{title}</strong><small>{workspace}</small><em>{state}</em>
      </div>)}
    </div>
    <div className="diff-panel"><div className="panel-title"><b>Review changes</b><span>+18　−4</span></div>
      <div className="diff-file">src / settings / page.tsx</div>
      <div className="diff-code"><CodeLine width={48}/><CodeLine width={76} tone="green"/><CodeLine width={61}/><CodeLine width={84} tone="green"/><CodeLine width={38}/><CodeLine width={70} tone="red"/><CodeLine width={55} tone="green"/></div>
      <div className="run-result"><b>✓ Tests passed</b><small>12 checks · review before merge</small></div>
    </div>
  </div>
  <div className="window-foot"><PaperLabel accent="#56a48f">拆分任务</PaperLabel><PaperLabel accent="#74a2d7">隔离执行</PaperLabel><PaperLabel accent="#d8a75a">检查结果</PaperLabel></div>
</div>;

const TraeDemo: React.FC<{frame: number}> = ({frame}) => <div className="agent-window trae-window">
  <div className="window-top"><span className="window-dots">● ● ●</span><b>TRAE Work</b><small>IDE Mode <span className="mode-arrow">↔</span> SOLO Mode</small></div>
  <div className="trae-body">
    <aside className="file-tree"><b>PROJECT</b><span>⌄ src</span><span className="tree-active">　⌄ settings</span><span>　　 page.tsx</span><span>　　 theme.css</span><span>⌄ tests</span><span>　 settings.test.ts</span><div className="tree-agent">✦ Builder</div></aside>
    <div className="editor-pane"><div className="tab-row"><span>page.tsx</span><span>theme.css</span><i>●</i></div><div className="editor-content"><small>01</small><CodeLine width={57}/><small>02</small><CodeLine width={81} tone="blue"/><small>03</small><CodeLine width={69}/><small>04</small><CodeLine width={74} tone="purple"/><small>05</small><CodeLine width={49}/><small>06</small><CodeLine width={86} tone="blue"/><small>07</small><CodeLine width={62}/><small>08</small><CodeLine width={73} tone="green"/></div><div className="agent-message">✦ Make the settings page clearer on mobile <span>Running…</span></div></div>
    <div className="preview-pane"><div className="preview-bar">●　localhost:3000/settings</div><div className="mini-app"><small>WORKSPACE</small><b>Settings</b><p>Manage your preferences</p><div className="setting-row"><span>Dark mode</span><i/></div><div className="setting-row"><span>Notifications</span><i/></div><button>Save changes</button></div></div>
  </div>
  <div className="window-foot"><PaperLabel accent="#41a69b">IDE 内协作</PaperLabel><PaperLabel accent="#6c87c6">端到端任务</PaperLabel><PaperLabel accent="#daa24a">即时预览</PaperLabel></div>
</div>;

const HarnessDemo: React.FC<{frame: number}> = ({frame}) => {
  const nodes = [
    {name:'Model',icon:'◉',x:8,y:17}, {name:'Tools',icon:'⌘',x:38,y:4},
    {name:'Skills',icon:'✦',x:70,y:17}, {name:'Agent loop',icon:'⟳',x:8,y:61},
    {name:'Sandbox',icon:'▣',x:38,y:73}, {name:'Sessions',icon:'▤',x:70,y:61},
  ];
  return <div className="agent-window harness-window">
    <div className="window-top"><span className="window-dots">● ● ●</span><b>DeepSeek Harness</b><small>Developer Preview · Cordis plugins</small></div>
    <div className="harness-body">
      <div className="plugin-board"><svg className="plugin-links" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M17 27 L45 15 L77 27 M17 27 L17 67 L45 81 L77 67 M17 67 L45 15 M77 27 L77 67 M45 15 L45 81"/></svg>
        {nodes.map((node,i)=><div className="plugin-node" key={node.name} style={{left:`${node.x}%`,top:`${node.y}%`,transform:`translateY(${Math.sin(frame/18+i)*4}px)`}}><b>{node.icon}</b><span>{node.name}</span></div>)}
        <div className="harness-core"><i>DSH</i><b>Agent runtime</b><small>compose · swap · extend</small></div>
      </div>
      <div className="trace-panel"><div className="trace-head"><b>Trajectory</b><small>LIVE SESSION</small></div>
        {['user prompt','model response','tool call: read_file','tool result','subagent scheduled','test output'].map((step,i)=><div className="trace-row" key={step} style={{opacity:interpolate(frame,[525+i*11,545+i*11],[0.26,1],clamp)}}><i>{i<2?'●':i<4?'⌘':'↗'}</i><span>{step}</span><small>{`0${i+1}`}</small></div>)}
        <div className="trace-footer">append-only event stream · replayable</div>
      </div>
    </div>
    <div className="window-foot"><PaperLabel accent="#5aa7a0">插件化</PaperLabel><PaperLabel accent="#d7a244">多种运行模式</PaperLabel><PaperLabel accent="#8592c2">轨迹可检查</PaperLabel></div>
  </div>;
};

const ClaudeDemo: React.FC<{frame: number}> = ({frame}) => <div className="agent-window claude-window">
  <div className="window-top"><span className="window-dots">● ● ●</span><b>Claude Code</b><small>terminal-first workflow</small></div>
  <div className="claude-body">
    <div className="terminal-pane"><div className="terminal-title">~/projects / settings-refresh</div>
      <div className="terminal-lines">
        {[
          ['$ claude',''],
          ['> inspect the settings flow and fix mobile overflow','prompt'],
          ['Reading src/settings/page.tsx','tool'],
          ['Editing responsive layout and tests','tool'],
          ['$ pnpm test','command'],
          ['✓ 14 tests passed','success'],
        ].map(([line,type],i)=><div className={`terminal-line ${type}`} key={line} style={{opacity:interpolate(frame,[735+i*11,750+i*11],[0,1],clamp)}}>{line}</div>)}
        <i className="terminal-caret"/>
      </div>
    </div>
    <div className="claude-orchestration"><div className="orchestration-title">Delegated work</div><div className="main-agent">Claude Code <small>main session</small></div><div className="branch-lines"/><div className="subagent agent-a"><b>Subagent</b><small>review CSS</small><i>✓</i></div><div className="subagent agent-b"><b>Subagent</b><small>check tests</small><i>✓</i></div><div className="hook-card"><span>POST TOOL USE</span><b>formatter hook</b><i>✓</i></div></div>
  </div>
  <div className="window-foot"><PaperLabel accent="#d09550">终端内直接操作</PaperLabel><PaperLabel accent="#a884ba">Subagents</PaperLabel><PaperLabel accent="#6a9c76">Hooks</PaperLabel></div>
</div>;

const Agents: React.FC<{frame: number}> = ({frame}) => {
  const roster = [
    ['CODEX','隔离任务','multi-task'],['TRAE WORK','IDE + SOLO','workspace'],
    ['DEEPSEEK HARNESS','插件组合','runtime'],['CLAUDE CODE','终端协作','terminal'],
  ];
  return <div className="agent-window roster-window"><div className="roster-heading"><small>ONE TASK / FOUR WORKFLOWS</small><h1>四种 Agent，四种演示方式</h1><p>同一个设置页任务，观察它们如何进入工作流</p></div><div className="roster-cards">{roster.map(([name,tag,icon],i)=><div className="roster-card" key={name} style={{transform:`translateY(${Math.sin(frame/20+i)*5}px)`,animationDelay:`${i*90}ms`}}><i className={`roster-icon ${icon}`}>{['◫','▤','⌘','›_'][i]}</i><b>{name}</b><span>{tag}</span><small>DEMO 0{i+1}</small></div>)}</div><div className="roster-note">同一目标 · 不同的控制面、协作方式与扩展路径</div></div>;
};

const Compare: React.FC<{frame:number}> = ({frame}) => <div className="agent-window compare-window"><div className="compare-title"><small>FOUR WAYS TO WORK</small><h1>差异在工作流，不在名字</h1></div><div className="compare-grid">{[
  ['CODEX','任务拆分','隔离工作区','Review / Tests','#65b59e'],
  ['TRAE WORK','IDE 协作','IDE + SOLO','代码与预览','#6d8dd0'],
  ['DEEPSEEK HARNESS','可组合','插件 / 模式','轨迹回放','#c69a4a'],
  ['CLAUDE CODE','终端操作','Subagents','Hooks / 命令','#b08ac4'],
].map(([name,focus,workflow,detail,color],i)=><div className="compare-col" key={name} style={{opacity:interpolate(frame,[960+i*8,985+i*8],[0.25,1],clamp),'--accent':color} as React.CSSProperties}><b>{name}</b><strong>{focus}</strong><span>{workflow}</span><small>{detail}</small></div>)}</div><div className="compare-footer">按任务、协作习惯与可控性选择　·　没有绝对排名</div></div>;

export const ConstraintBook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const seconds = frame / fps;
  const scenes = [
    {start:0,end:105,node:<Agents frame={frame}/>},
    {start:78,end:315,node:<CodexDemo frame={frame}/>},
    {start:288,end:525,node:<TraeDemo frame={frame}/>},
    {start:498,end:735,node:<HarnessDemo frame={frame}/>},
    {start:708,end:945,node:<ClaudeDemo frame={frame}/>},
    {start:918,end:1146,node:<Compare frame={frame}/>},
  ];
  const captionIndex = captions.reduce((n,c,i)=>frame>=c.at?i:n,0);
  const caption = captions[captionIndex];
  const captionOpacity = interpolate(frame,[caption.at,caption.at+9,caption.at+76,caption.at+90],[0,1,1,0],clamp);
  const sceneName = frame<90?'OVERVIEW':frame<300?'01 / CODEX':frame<510?'02 / TRAE WORK':frame<720?'03 / DEEPSEEK HARNESS':frame<930?'04 / CLAUDE CODE':'TAKEAWAY';
  return <AbsoluteFill className="agent-stage">
    <div className="wood-grain"/><div className="stage-vignette"/><div className="lamp-glow"/>
    <div className="stage-topline"><span>FIELD NOTES / AGENT SHOWCASE</span><b>{sceneName}</b><small>{seconds.toFixed(1)}s</small></div>
    <div className="showcase-area">{scenes.map((scene,i)=><div className="scene-layer" key={scene.start} style={{opacity:getOpacity(frame,scene.start,scene.end),transform:`translate(-50%, -50%) scale(${interpolate(frame,[scene.start,scene.start+20,scene.end-20,scene.end],[0.96,1,1,0.97],clamp)})`,zIndex:i}}>{scene.node}</div>)}</div>
    <div className="caption-ribbon" style={{opacity:captionOpacity,transform:`translateX(-50%) translateY(${(1-captionOpacity)*12}px)`}} key={caption.at}>{caption.text}</div>
    <div className="frame-progress"><i style={{transform:`scaleX(${frame/1145})`}}/></div>
  </AbsoluteFill>;
};
