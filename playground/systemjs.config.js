'use strict';
/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function () {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': '../node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
      'tslib': 'npm:tslib/tslib.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/cdk/platform': 'npm:@angular/cdk/bundles/cdk-platform.umd.js',
      '@angular/cdk/coercion': 'npm:@angular/cdk/bundles/cdk-coercion.umd.js',
      '@angular/cdk/scrolling': 'npm:@angular/cdk/bundles/cdk-scrolling.umd.js',
      '@angular/cdk/bidi': 'npm:@angular/cdk/bundles/cdk-bidi.umd.js',
      '@angular/cdk/collections': 'npm:@angular/cdk/bundles/cdk-collections.umd.js',
      '@angular/cdk/drag-drop': 'npm:@angular/cdk/bundles/cdk-drag-drop.umd.js',
      'rxjs': 'npm:rxjs',


      // other libraries
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',

      'marked': 'npm:marked/marked.min.js',
      'prismjs': 'npm:prismjs/prism.js',
      'ngx-md': 'npm:ngx-md/bundles/ngx-md.umd.js', 
      
      'dexih-ngx-table': '../dist'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        defaultExtension: 'js',
        meta: {
          './*.js': {
            loader: 'systemjs-angular-loader.js'
          }
        }
      },
      rxjs: {
        defaultExtension: 'js',
        main: 'index.js'
      },
      'rxjs/operators': {main: 'index.js', defaultExtension: 'js' },
      'dexih-ngx-table': {
        main: 'dexih-ngx-table.umd.js',
        defaultExtension: 'js'
      }
    }
  });
})(this);
