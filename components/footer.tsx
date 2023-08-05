import * as React from 'react'
import { Github } from '@/components/icons/Github'
import { Luffy } from '@/components/icons/Luffy'
import { siteConfig } from '@/lib/site-config'

export function Footer() {
  return (
    <footer className="p-8 text-tertiary space-y-4">
      <div className="flex justify-center items-center space-x-4">
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black transition-colors"
          title="GitHub"
        >
          <Github className="h-5 w-5" />
        </a>
        <a
          href="https://haikhalfakhreez.com"
          rel="noopener noreferrer"
          target="_blank"
          className="hover:text-black transition-colors"
          title="Profile"
        >
          <Luffy className="h-[22px] w-[22px]" />
        </a>
      </div>
      <div className="text-center text-[10px]">
        Made with 💙 by Haikhal Fakhreez. Last updated: <strong>July 2023</strong>.
      </div>
    </footer>
  )
}
