import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import './style.css';

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const captions = [
  {at: 0, text: '我通常不会给 Omni 模型直接写提示词'},
  {at: 90, text: '而是反复和 Gemini 对话'},
  {at: 180, text: '产生一套视频生成提示词'},
  {at: 270, text: '例如我会从不同的角度进行约束'},
  {at: 360, text: '例如世界观和故事背景层面'},
  {at: 450, text: '每个镜头都有哪些特殊的时代背景'},
  {at: 540, text: '不同的镜头分别应用不同的画面风格'},
  {at: 630, text: '同时剪辑节奏和声音'},
  {at: 720, text: '设计也会有一个定义'},
  {at: 810, text: '产出不同于平均水平的内容'},
  {at: 900, text: '在内容不再稀缺的今天'},
  {at: 990, text: '足够多的约束意味着独特性'},
  {at: 1080, text: '也能让一条视频脱颖而出'},
];

const labels = [
  {text: '◎ 世界观·故事', color: '#29836f'},
  {text: '⌛ 时间跨度', color: '#d38a1a'},
  {text: '▦ 时代背景', color: '#c54939'},
  {text: '✎ 画面风格', color: '#315989'},
  {text: '♫ 节奏·声音', color: '#805485'},
];

const Sticker: React.FC<{text: string; color?: string; style?: React.CSSProperties}> = ({text, color = '#b88642', style}) => (
  <div className="sticker" style={{'--accent': color, ...style} as React.CSSProperties}>{text}</div>
);

const MoonScene: React.FC<{frame: number}> = ({frame}) => {
  const sway = Math.sin(frame / 42) * 1.6;
  return <div className="landscape" style={{transform: `rotateX(-2deg) rotateY(${sway}deg)`}}>
    <div className="night-sky"><div className="stars"/><div className="moon"><i/><i/><i/><i/></div>
      <div className="mountain m1"/><div className="mountain m2"/><div className="mountain m3"/>
      <div className="village">{['#d64d33','#e6a425','#2c8b76','#bd4260','#8f5494','#e19b25'].map((c,i)=><div className="house" key={i} style={{'--roof':c,'--i':i} as React.CSSProperties}><b/><i/><i/><i/><i/></div>)}</div>
      <div className="sea"><div className="reflection"/><div className="waves"/></div>
      <div className="shore"/><div className="cliff"/>
      <div className="lighthouse"><div className="lamp"/><div className="tower"/><div className="lightbeam"/></div>
    </div>
  </div>;
};

const Accordion: React.FC<{frame: number; color?: boolean; compact?: boolean}> = ({frame, color = false, compact = false}) => {
  const cards = [
    {year:'1925', scene:'A long sunset across an empty sea', tint:'#bf6835'},
    {year:'1965', scene:'A paper rocket lifts from the shore', tint:'#2085a0'},
    {year:'1995', scene:'A bright city grows by the water', tint:'#2580bc'},
    {year:'2035', scene:'A quiet future beneath the stars', tint:'#343a72'},
  ];
  return <div className={`accordion ${compact?'compact':''}`}>
    {cards.map((c,i)=>{
      const pop = interpolate(frame, [330+i*10, 375+i*8], [0.68, 1], clamp);
      return <div className="fold" key={c.year} style={{'--i':i,'--tint':c.tint, transform:`translateY(${(1-pop)*105}px) rotateY(${(i-1.5)*-5}deg)`, opacity:pop} as React.CSSProperties}>
        <div className="fold-top"><span>镜头 {i+1}</span><b>{c.year}</b></div>
        {color ? <div className="mini-scene" style={{background:`linear-gradient(180deg, ${c.tint} 0 48%, #f0bf68 49% 100%)`}}><div className="mini-sun"/><div className="mini-hill"/><div className="mini-mark">{i===1?'↗':i===2?'▥':'✦'}</div></div> : <div className="fold-empty"><span>场景与动作</span></div>}
        <div className="fold-footer">保持人物与故事连续</div>
      </div>;
    })}
  </div>;
};

const Person: React.FC<{className?: string}> = ({className=''}) => <div className={`person ${className}`}><div className="hair"/><div className="face"/><div className="coat"/><div className="leg left"/><div className="leg right"/><div className="boot left"/><div className="boot right"/></div>;

const Omni: React.FC = () => <div className="omni"><div className="omni-top">AI VIDEO MODEL</div><div className="omni-front"><strong>OMNI</strong><small>AI VIDEO MODEL</small><i/></div><div className="omni-side"><b/><i/></div></div>;

const ScatteredPaper: React.FC<{frame:number}> = ({frame}) => <div className="paper-field">{Array.from({length:25},(_,i)=>{
  const x=(i*137)%100, y=(i*71)%74, rot=(i*47)%100-50;
  const rise=interpolate(frame,[930+i*2,1030+i*2],[30,0],clamp);
  return <div className="loose-paper" key={i} style={{left:`${x}%`,top:`${y+rise}%`,transform:`rotate(${rot}deg) scale(${0.65+(i%4)*0.12})`,opacity:interpolate(frame,[900+i*2,960+i*2],[0,0.86],clamp)}}><i/><i/><i/></div>;
})}</div>;

export const ConstraintBook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const seconds = frame / fps;
  const shot = Math.floor(frame / 90);
  const isOpen = frame >= 290 && frame < 960;
  const built = interpolate(frame,[180,330],[0,1],clamp);
  const cardsColor = frame >= 585;
  const far = frame >= 780;
  const openScale = far ? 0.62 : interpolate(frame,[270,330,780],[0.73,1,1],clamp);
  const bookX = far ? 18 : 0;
  const capIndex = captions.reduce((n,c,i)=>frame>=c.at?i:n,0);
  const cap = captions[capIndex];
  const capIn = interpolate(frame,[cap.at,cap.at+10],[0,1],clamp) * interpolate(frame,[cap.at+79,cap.at+90],[1,0],clamp);
  const titleOpacity = interpolate(frame,[1080,1110],[0,1],clamp);
  const grain = `radial-gradient(ellipse at 50% 46%, rgba(106,69,31,.20), transparent 62%), linear-gradient(180deg, #130d07 0%, #29190e 46%, #160e08 100%)`;

  return <AbsoluteFill className="stage" style={{background:grain}}>
    <div className="table-grain"/>
    <div className="vignette"/>
    <div className="warm-pool" style={{opacity:interpolate(frame,[0,120,1080,1145],[0.55,0.9,0.82,0.22],clamp)}}/>
    <div className="set-piece">
      {seconds < 6 && <div className="opening-top"><div className="paper-book-top"><div/><div/></div><Sticker text="我"/><Sticker text="✦ Gemini" color="#455e9b"/></div>}
      {seconds < 11 && <div className="opening-omni" style={{opacity:interpolate(frame,[0,35,80,125],[1,1,0.3,0],clamp),transform:`translate(${interpolate(frame,[0,120],[0,-300],clamp)}px, ${interpolate(frame,[0,120],[0,-50],clamp)}px) scale(${interpolate(frame,[0,100],[1,0.68],clamp)})`}}><Omni/></div>}
      {isOpen && <div className="book-wrap" style={{transform:`translateX(${bookX}px) scale(${openScale})`}}>
        <div className="back-cover"/><div className="upright-page"><MoonScene frame={frame}/></div>
        <div className="page-base"><div className="grass"/></div>
        <div className="front-page"><div className="sand"/><div className="page-seam"/>
          {frame < 585 && <Person className="paper-person"/>}
          {frame >= 585 && <div className="props"><div className="toy train">▰<i/>◉◉</div><div className="rocket">◢<i/></div><div className="screen">▰<b/></div><Person className="paper-person"/></div>}
          <div className="book-rules"><i/><i/><i/><i/></div>
        </div>
        {frame >= 360 && <div className="card-row">
          {['1925','1965','1995','2035'].map((year,i)=><div className="story-card" key={year} style={{'--tilt':['6deg','2deg','-2deg','-6deg'][i],'--lift':['0px','8px','0px','8px'][i]} as React.CSSProperties}>
            <header><small>镜头 {i+1}</small><b>{year}</b></header>
            <div className={`story-art art-${i}`}><i/><strong>{['落日海岸','火箭升空','海边城市','未来风车'][i]}</strong></div>
            <footer>保持故事连续</footer>
          </div>)}
        </div>}
        <div className="front-spine"/>
        <div className="label-row">{labels.map((label,i)=><Sticker key={i} text={label.text} color={label.color} style={{transform:`rotate(${(i-2)*2.2}deg) translateY(${Math.sin(frame/23+i)*3}px)`}}/>)}</div>
        {frame > 500 && <div className="checks">✓　✓　✓　✓　✓</div>}
      </div>}
      {frame < 280 && <div className="book-tease" style={{opacity:interpolate(frame,[55,120,260,290],[0,1,1,0],clamp)}}><div className="blank-spread"><div className="left-page"/><div className="right-page"/><div className="magenta-insert" style={{transform:`scaleY(${interpolate(frame,[170,240],[0,1],clamp)})`}}/></div><Sticker text="我"/><Sticker text="✦ Gemini" color="#455e9b"/></div>}
      {far && <div className="omni-far"><Omni/></div>}
      {frame >= 960 && <><ScatteredPaper frame={frame}/><div className="book-return" style={{opacity:interpolate(frame,[960,1010],[0,1],clamp)}}><MoonScene frame={frame}/><Accordion frame={frame} color compact/><div className="return-labels">世界观　时间跨度　时代背景　画面风格　节奏声音</div></div></>}
    </div>
    <div className="shot-mark">{String(shot+1).padStart(2,'0')} <span>/</span> 13</div>
    <div className="caption" style={{opacity:capIn,transform:`translateX(-50%) translateY(${(1-capIn)*14}px)`}} key={cap.at}>{cap.text}</div>
    <div className="outro" style={{opacity:titleOpacity}}><span>CONSTRAINTS / CREATE</span><strong>约束越多</strong><em>作品越能脱颖而出</em><i/></div>
    <div className="progress"><i style={{transform:`scaleX(${frame/1145})`}}/></div>
  </AbsoluteFill>;
};
