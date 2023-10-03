interface SiteConfig {
  name: string
  url: string
  description: string
  links: {
    twitter: string
    github: string
  }
}

export const siteConfig: SiteConfig = {
  name: 'Supermark',
  url: 'https://supermark.vercel.app',
  description: 'Supermark is a catalog of all the best deals from your favorite stores 💰',
  links: {
    twitter: 'https://twitter.com/braswell_jnr',
    github: 'https://github.com/braswelljr/supermark'
  }
}
