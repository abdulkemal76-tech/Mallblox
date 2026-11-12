import { useEffect, useRef } from 'react';

export default function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleFocus = () => {
      iframeRef.current?.focus();
    };
    const forwardKey = (e: KeyboardEvent) => {
      const cw = iframeRef.current?.contentWindow;
      if (!cw || document.activeElement === iframeRef.current) return;
      cw.dispatchEvent(new KeyboardEvent(e.type, {
        key: e.key,
        code: e.code,
        keyCode: e.keyCode,
        bubbles: true,
        cancelable: true,
      }));
    };
    handleFocus();
    window.addEventListener('click', handleFocus);
    window.addEventListener('keydown', forwardKey);
    window.addEventListener('keyup', forwardKey);
    return () => {
      window.removeEventListener('click', handleFocus);
      window.removeEventListener('keydown', forwardKey);
      window.removeEventListener('keyup', forwardKey);
    };
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-950 m-0 p-0 flex flex-col">
      <iframe
        ref={iframeRef}
        src="/assets/aistudio/Mallblox_3D_Mancing_Upgrade_v2_025c58b9.html?v=obby_v3"
        title="Mallblox 3D - Mancing di Laut & Mega Obby Menara Langit"
        className="w-full h-full border-none block flex-1"
        allow="autoplay; camera; microphone; fullscreen"
      />
    </div>
  );
}
