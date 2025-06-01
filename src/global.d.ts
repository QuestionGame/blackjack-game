// src/global.d.ts

// Декларація для CSS Modules (файли .module.css)
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Декларація для SCSS Modules (файли .module.scss)

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Декларація для SASS Modules (файли .module.sass)
declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

