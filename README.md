# My Personal Website
Check it out [here](https://ridhitbhura.com/)

## Overview

This README provides an overview of how I created and deployed my personal website using [Hugo](https://gohugo.io/), the [Hugo-Profile](https://themes.gohugo.io/themes/hugo-profile/) theme, and [Netlify](https://gohugo.io/hosting-and-deployment/hosting-on-netlify/).

## Motivation

I chose this approach because using GoDaddy's website builder was both expensive and, frankly, embarrassing for a Computer Science major like myself. I wanted to create a custom website with more control and flexibility without relying on a drag-and-drop builder.

## Why Hugo?

Hugo is a static site generator that allows for quick and efficient website creation. Unlike Vue.js or other JavaScript libraries, which offer high control, Hugo is more suited for generating static sites swiftly.

## Steps to Create the Website

1. **Choosing Hugo and Hugo-Profile Theme:**

   - I used Hugo to build the static site and selected the Hugo-Profile theme from [Hugo Themes](https://themes.gohugo.io/themes/hugo-profile/).
   - Hugo's structure made it easy to organize content and templates.

2. **Customizing the Theme:**

   - To make modifications to the original Hugo-Profile theme, I replaced files and directories in my Hugo project directory with those from the theme.
   - This allowed me to maintain the theme's aesthetics while tailoring the content and layout to my needs.

3. **Deploying with Netlify:**

   - I chose Netlify for deployment due to its continuous deployment feature, ease of use, and cost-effectiveness (it's free).
   - Netlify automates the deployment process whenever I push updates to my website repository.

4. **Connecting with GoDaddy:**
   - Since I owned my domain through GoDaddy, I configured DNS routing and set up CDN via Netlify to host the site on my domain.
   - Helpful articles:
     - [Netlify to GoDaddy : Link 1](https://medium.com/@kajol_singh/connect-your-godaddy-domain-to-netlify-d53f8758f3d0)
     - [Netlify to GoDaddy : Link 2](https://levelup.gitconnected.com/netlify-custom-domains-8b4cc5fddb5d)
