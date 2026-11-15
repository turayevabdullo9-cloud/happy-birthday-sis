import { useEffect, useRef, useState } from 'react';
import { Music, Pause, Play, Upload, Volume2, VolumeX } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/birthday';
import type { TranslationContent } from '../translations';

interface MusicPlayerProps {
  t: TranslationContent['music'];
}

export function MusicPlayer({ t }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const volumeRef = useRef<number>(0.65);
  const shouldAutoPlayRef = useRef<boolean>(false);

  const [audioSrc, setAudioSrc] = useState<string>(BIRTHDAY_CONFIG.musicUrl);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [customTrackName, setCustomTrackName] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.preload = 'metadata';
    audio.volume = volumeRef.current;
    audioRef.current = audio;

    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handleError = () => setIsPlaying(false);

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('error', handleError);

    if (shouldAutoPlayRef.current) {
      shouldAutoPlayRef.current = false;
      void audio.play().catch(() => setIsPlaying(false));
    }

    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('error', handleError);
      audioRef.current = null;
    };
  }, [audioSrc]);

  useEffect(() => {
    volumeRef.current = volume;
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsPanelOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPanelOpen(false);
      }
    };
    if (isPanelOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isPanelOpen]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setCustomTrackName(file.name.replace(/\.[^/.]+$/, ''));
    shouldAutoPlayRef.current = true;
    setAudioSrc(url);
  };

  return (
    <div ref={panelRef} className="relative flex items-center gap-1 sm:gap-1.5">
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? t.pauseLabel : t.playLabel}
        aria-pressed={isPlaying}
        className={`inline-flex h-8 w-8 sm:h-9 sm:w-9 xl:w-auto xl:px-3 items-center justify-center gap-2 rounded-full border text-xs font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9E6263] whitespace-nowrap shrink-0 ${
          isPlaying
            ? 'border-[#B89352] bg-[#3A2D28] text-[#FAF6F0]'
            : 'border-[#DDD2C2] bg-[#FBF8F3] text-[#3A2D28] hover:border-[#B89352]'
        }`}
      >
        {isPlaying ? (
          <Pause className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        ) : (
          <Play className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        )}
        <span className="hidden xl:inline">
          {isPlaying ? t.playing : t.playLabel}
        </span>
      </button>

      <button
        type="button"
        onClick={() => setIsPanelOpen((prev) => !prev)}
        aria-label={t.title}
        aria-expanded={isPanelOpen}
        className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-[#DDD2C2] bg-[#FBF8F3] text-[#5C4942] transition-colors duration-200 hover:border-[#B89352] hover:text-[#3A2D28] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9E6263]"
      >
        <Music className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
      </button>

      {isPanelOpen && (
        <div
          role="dialog"
          aria-label={t.title}
          className="absolute right-0 top-12 z-50 w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-[#E2D6C5] bg-[#FBF8F3] p-4 shadow-lg"
        >
          <div className="flex items-start justify-between gap-3 border-b border-[#EFE6D8] pb-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#847068]">
                {t.title}
              </p>
              <p className="mt-1 font-serif text-lg font-semibold text-[#3A2D28] truncate max-w-[175px]">
                {customTrackName ?? t.trackName}
              </p>
            </div>
            <span className="text-xs font-medium text-[#9E6263] whitespace-nowrap">
              {isPlaying ? t.playing : t.paused}
            </span>
          </div>

          <div className="mt-3.5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setVolume(volume === 0 ? 0.65 : 0)}
              aria-label={t.volumeLabel}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#5C4942] hover:bg-[#EFE6D8] transition-colors"
            >
              {volume === 0 ? (
                <VolumeX className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Volume2 className="h-4 w-4" aria-hidden="true" />
              )}
            </button>

            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              aria-label={t.volumeLabel}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer accent-[#9E6263]"
            />
            <span className="w-8 text-right text-xs tabular-nums text-[#847068]">
              {Math.round(volume * 100)}%
            </span>
          </div>

          <div className="mt-4 border-t border-[#EFE6D8] pt-3">
            <p className="text-xs leading-relaxed text-[#847068]">
              {t.customTrackHint}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/mp3,audio/mpeg,audio/*"
              aria-hidden="true"
              tabIndex={-1}
              onChange={handleFileUpload}
              className="sr-only"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-2.5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#DDD2C2] bg-[#FAF6F0] px-3 py-2 text-xs font-medium text-[#3A2D28] transition-colors hover:border-[#B89352] hover:bg-[#EFE6D8]"
            >
              <Upload className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.loadFileButton}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
