# Law Firm Website Brief Builder

Bring your practice areas, client needs and enquiry process into a concise website brief.

**For law firm partners and practice managers. No coding knowledge needed.**

[Open the free tool](https://web-design-for-law-firms.github.io/legal-content-review-register/) · [See a fictional worked example](https://web-design-for-law-firms.github.io/legal-content-review-register/examples/customer-output.html)

![Desktop preview](docs/preview.png)

## How to use it

1. Open the tool in your browser. No installation or account is needed.
2. Use your own business details in the labelled fields, or choose **Try a fictional example**.
3. Choose **Prepare my website brief** and review the result.
4. Adjust your answers, then copy the result, download a text file or choose **Print / Save PDF**.

A content and enquiry brief for your website project, ready for internal review.

## What to expect

Use public, general information about your firm. Keep client names, matter details and confidential documents out of this tool.

This supports website planning. It does not provide legal advice or assess regulatory compliance.

Your answers are processed in the browser tab. They are not uploaded, emailed or saved by the tool. Refreshing or closing the tab clears them. Save your result before leaving. GitHub provides hosting and handles normal request logs. Example details are fictional, not customer results.

## Design and maintenance

The interface uses the colours, typography and visual treatment of [Web Design for Law Firms](https://webdesignforlawfirms.co.uk/). The tool is maintained by Web Design for Law Firms, operated by JW Digital Services Ltd. The commercial website is a separate project.

## For developers

The customer tool uses native HTML controls and small browser modules, with no runtime framework. Its planning or calculation rules are in `src/customer.js`; presentation helpers are in `src/customer-ui.js`.

```sh
npm ci --ignore-scripts
npm test
npm run build
npm run serve
```

Open the local address printed by the server. `npm run build:pages` prepares the static GitHub Pages artifact. Tests cover the customer rules and output escaping.

The original v0.1 developer helpers remain in `src/index.js` for compatibility, with their original examples. They are not needed to use the customer tool. The existing repository name and Pages URL are retained so earlier links keep working.

## Licence and feedback

MIT for tool code. Bundled typefaces retain their original licence notices in `demo/assets/font-licences`. [Ideas and feedback](https://github.com/Web-Design-For-Law-Firms/legal-content-review-register/discussions/1).
