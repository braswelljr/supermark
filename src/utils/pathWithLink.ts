/**
 * pathsWithLinks - Returns an array of objects with the path and link of each path segment.
 * @param {string} path - The path to be split into segments.
 * @param {Array<string>} segments - An array of segments to be added to the beginning of the path.
 * @returns {Array<{name: string, link: string}>} - An array of objects with the path and link of each path segment.
 * @example
 * pathsWithLinks('a/b/c')
 * // returns [{path: '/a', link: '/a'}, {path: 'b', link: '/a/b'}, {path: 'c', link: '/a/b/c'}]
 */
export default function pathsWithLinks(path: string, segments?: Array<string>) {
  const paths = path.split('/').filter(path => path !== '')

  return paths.map((path, i, self) => {
    return {
      name: path,
      link: `/${(Array.isArray(segments) ? [...segments, ...self] : self).slice(0, i + 1).join('/')}`
    }
  })
}
