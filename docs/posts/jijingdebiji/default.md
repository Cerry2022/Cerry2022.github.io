```CSS
    code[class*='language-'],

    pre[class*='language-'] {

        text-align: left !important;

        white-space: pre !important;

        word-spacing: normal !important;

        word-break: normal !important;

        word-wrap: normal !important;

        line-height: 1.5 !important;

        -moz-tab-size: 4 !important;

        -o-tab-size: 4 !important;

        tab-size: 4 !important;

        -webkit-hyphens: none !important;

        -moz-hyphens: none !important;

        -ms-hyphens: none !important;

        hyphens: none !important;

    }

  

    /* Code blocks */

    pre[class*='language-'] {

        padding: 1em !important;

        margin: .5em 0 !important;

        overflow: auto !important;

    }

  

    /* Inline code */

    :not(pre)>code[class*='language-'] {

        padding: .1em !important;

        border-radius: .3em !important;

        white-space: normal !important;

    }
```