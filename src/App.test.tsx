// @vitest-environment jsdom
import { act } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { createRoot, type Root } from 'react-dom/client'
import App from './App'

;(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean })
  .IS_REACT_ACT_ENVIRONMENT = true

let root: Root | undefined

function renderApp() {
  const container = document.createElement('div')

  document.body.append(container)

  act(() => {
    root = createRoot(container)
    root.render(<App />)
  })

  return container
}

afterEach(() => {
  if (root) {
    act(() => {
      root?.unmount()
    })
  }

  root = undefined
  document.body.innerHTML = ''
})

describe('App', () => {
  it('renders the guild landing information', () => {
    const container = renderApp()
    const discordLink = container.querySelector<HTMLAnchorElement>('.discord-button')

    expect(container.querySelector('h1')?.textContent).toBe('Balling Bears')
    expect(container.textContent).toContain('Tuesday 6-9pm PST')
    expect(container.textContent).toContain('Thursday 6-9pm PST')
    expect(discordLink?.getAttribute('href')).toBe('https://discord.gg/jBAHvEAukT')
    expect(discordLink?.getAttribute('target')).toBe('_blank')
    expect(discordLink?.getAttribute('rel')).toBe('noreferrer')
  })

  it('renders accessible external site buttons', () => {
    const container = renderApp()
    const links = Array.from(
      container.querySelectorAll<HTMLAnchorElement>('.external-link-button'),
    )

    expect(
      links.map((link) => ({
        href: link.getAttribute('href'),
        label: link.getAttribute('aria-label'),
        rel: link.getAttribute('rel'),
        target: link.getAttribute('target'),
        title: link.getAttribute('title'),
      })),
    ).toEqual([
      {
        href: 'https://www.youtube.com/@ballinbears',
        label: 'YouTube',
        rel: 'noreferrer',
        target: '_blank',
        title: 'YouTube',
      },
      {
        href: 'https://www.warcraftlogs.com/guild/us/malganis/balling%20bears',
        label: 'WarcraftLogs',
        rel: 'noreferrer',
        target: '_blank',
        title: 'WarcraftLogs',
      },
      {
        href: 'https://raider.io/guilds/us/malganis/Balling%20Bears',
        label: 'Raider.io',
        rel: 'noreferrer',
        target: '_blank',
        title: 'Raider.io',
      },
    ])
    expect(links.every((link) => link.querySelector('img')?.getAttribute('alt') === '')).toBe(
      true,
    )
  })
})
