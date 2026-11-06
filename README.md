# mofiyinebo.com

The personal site of **Mofiyinfoluwa Ebo** (Mofiyin Ebo): Head of Product and Mobile App Development Lead at [Haze Couture](https://apps.apple.com/us/app/haze-couture-try-on-shop/id6759711912), and a Flutter developer based in Nigeria.

**Live:** [mofiyinebo.com](https://mofiyinebo.com) · **CV:** [cv.mofiyinebo.com](https://cv.mofiyinebo.com)

## What's on it

- **About, experience, education and skills**, including Haze Couture and a First Class B.Sc. in Computer Science from Covenant University.
- **Featured projects**: Haze Couture, aLaStudie, neFaRec, HybStockAdvisor, SIWES360, OtakuPlanner and Escra, each with a case study and links to its code, plus six earlier projects and clones.
- **Tap-through app tours.** Haze Couture, aLaStudie, neFaRec, SIWES360, OtakuPlanner, Escra and Lodgix open in a phone frame you can click through screen by screen, built from real screenshots of the apps.
- **Paper theme in light and dark**, with a dock for moving between sections.
- **A playful 404 page.**

## How it's built

Plain HTML, CSS and JavaScript, with no build step.

- [Bootstrap 5.3](https://getbootstrap.com/) for the grid and modals
- [Font Awesome 6](https://fontawesome.com/) for icons
- [Montserrat](https://fonts.google.com/specimen/Montserrat) from Google Fonts

```
index.html                The whole site
404.html                  Not-found page
css/style.css             All styles, including both themes
js/script.js              Navigation, dock, theme switch, modals
js/phone-prototype.js     The phone frame for the app tours
js/app-prototypes.js      Screens and tap targets for each tour
screenshots/device/       Screenshots used by the tours
assets/                   Portrait, paper textures, share card
```

## Run it locally

Any static file server works, for example:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploying

The site deploys to [Vercel](https://vercel.com) on every push to `main`. `.vercelignore` keeps original images, editor files and notes out of the deployed site.

## Contact

- Email: [ebomofiyin@outlook.com](mailto:ebomofiyin@outlook.com)
- LinkedIn: [Mofiyinfoluwa Ebo](https://linkedin.com/in/mofiyinfoluwa-ebo-57b65423a/)
- GitHub: [mofixiu](https://github.com/mofixiu)
