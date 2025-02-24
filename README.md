# PlowTheTrail.com

## Documentation

- [Nuxt introduction](https://nuxt.com/docs/getting-started/introduction)
- [Nuxt UI](https://ui.nuxt.com/getting-started)
- [`nuxt-mapbox`](https://alexlavoie42.github.io/Nuxt-Mapbox/)
- [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/guides)

## Development

Development requires a recent version of [Bun](https://bun.sh/docs/installation).

```shell
# Make sure to install dependencies first
$ bun install

# Then, start the development server
$ bun run dev

# Format and lint code before committing
$ bun run lint  # or lint:fix
$ bun run format
```

## Production

The `main` branch is automatically deployed to production by Cloudflare. Other branches get deployed as preview deployments.

Deployments can be previewed locally with:

```shell
$ bun run build && bun run preview
```
