import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-orange-50 to-white dark:from-zinc-900 dark:to-black">
      <main className="flex flex-col items-center justify-center gap-8 p-8">
        {/* Logo */}
        <div className="relative mb-4">
          <div className="absolute -inset-4 rounded-full bg-orange-500/20 blur-xl"></div>
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-xl">
            <span className="text-5xl">🍳</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-6xl font-bold tracking-tight text-transparent sm:text-7xl">
          Hello World
        </h1>

        {/* Subtitle */}
        <p className="max-w-md text-center text-lg text-zinc-600 dark:text-zinc-400">
          吃点啥 - EatWhat
        </p>

        {/* Description */}
        <p className="max-w-lg text-center text-base leading-relaxed text-zinc-500 dark:text-zinc-500">
          基于 AI 的每日家常菜谱推荐应用
          <br />
          根据用户喜好，利用 AI 生成个性化每日菜谱
        </p>

        {/* Feature badges */}
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
            ✨ AI 菜谱生成
          </span>
          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
            🎯 个性化推荐
          </span>
          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
            🤖 Qwen AI
          </span>
        </div>

        {/* CTA Button */}
        <div className="mt-8 flex gap-4">
          <button className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-3 text-white font-semibold shadow-lg transition-all hover:from-orange-600 hover:to-orange-700 hover:scale-105 hover:shadow-xl">
            开始探索
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-zinc-400">
          <p>Built with Next.js 15 + TypeScript + Tailwind CSS</p>
          <p className="mt-1">Powered by Qwen AI</p>
        </footer>
      </main>
    </div>
  );
}
