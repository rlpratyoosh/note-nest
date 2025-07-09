"use client";
import { GiNestBirds } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { HiOutlineSparkles } from "react-icons/hi2";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen px-4 bg-background">
      <div className="flex flex-col md:flex-row gap-10 items-center justify-center py-24 w-full max-w-6xl">
        <div className="flex flex-col items-center md:items-start justify-center gap-6 w-full md:w-1/2">
          <div className="flex items-center gap-3 rounded-xl border bg-card px-4 py-2 text-sm font-medium text-foreground shadow">
            <GiNestBirds className="text-2xl" />
            Your Digital Nest
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight text-center md:text-left">
            Organize Your Thoughts with NoteNest
          </h1>
          <p className="text-lg text-muted-foreground text-center md:text-left">
            A beautiful, intuitive note-taking app to capture ideas, track
            goals, and organize your thoughts in one seamless workspace.
          </p>
          <button
            className="mt-4 px-6 py-3 rounded-lg shadow font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition cursor-pointer"
            onClick={() => router.push("/dashboard")}
          >
            Get Started
          </button>
        </div>
        <div className="flex items-center justify-center w-full md:w-1/2 h-80">
          <img
            src="./laptop.jpg"
            alt="laptop"
            className="w-full h-full rounded-2xl object-cover shadow border"
          />
        </div>
      </div>
      <section className="flex flex-col gap-4 items-center justify-center w-full max-w-6xl py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Everything you need to stay organized
        </h2>
        <p className="text-lg text-muted-foreground text-center max-w-2xl">
          NoteNest provides all the tools you need to capture, organize, and reflect on your thoughts and ideas.
        </p>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl py-8">
        <div className="flex flex-col items-center bg-card rounded-2xl shadow-lg p-8 border hover:shadow-xl transition">
          <span className="text-4xl mb-4 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="4" y="4" width="16" height="16" rx="4" strokeWidth="2" />
              <path d="M8 10h8M8 14h5" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <h3 className="text-xl font-semibold mb-2">Quick Notes</h3>
          <p className="text-muted-foreground text-center">
            Instantly jot down ideas, reminders, or to-dos. Capture thoughts on the fly and never miss a moment of inspiration.
          </p>
        </div>
        <div className="flex flex-col items-center bg-card rounded-2xl shadow-lg p-8 border hover:shadow-xl transition">
          <span className="text-4xl mb-4 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="5" y="3" width="14" height="18" rx="2" strokeWidth="2" />
              <path d="M9 7h6M9 11h6M9 15h3" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <h3 className="text-xl font-semibold mb-2">Daily Journals</h3>
          <p className="text-muted-foreground text-center">
            Reflect on your day, track progress, and build a journaling habit with dedicated daily entries.
          </p>
        </div>
        <div className="flex flex-col items-center bg-card rounded-2xl shadow-lg p-8 border hover:shadow-xl transition">
          <span className="text-4xl mb-4 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M4 7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7z" strokeWidth="2" />
              <path d="M8 3v4M16 3v4" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <h3 className="text-xl font-semibold mb-2">Organized Notes</h3>
          <p className="text-muted-foreground text-center">
            Structure your notes with folders and tags. Keep everything tidy and easy to find for maximum productivity.
          </p>
        </div>
      </div>
      <footer className="w-full bg-card border-t py-16 mt-12 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Ready to organize your thoughts?
          <br />
          Start your journey today.
        </h2>
        <p className="text-lg text-muted-foreground text-center max-w-2xl mb-8">
          Join thousands of people who have transformed their note-taking experience with NoteNest. Your ideas deserve a beautiful home.
        </p>
        <button
          className="flex items-center gap-2 px-8 py-4 rounded-lg shadow font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition text-lg cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          <HiOutlineSparkles />
          Start Taking Notes
        </button>
      </footer>
    </div>
  );
}
