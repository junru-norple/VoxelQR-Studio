import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['_workspace/**', 'Repository/**', 'Versions/**', 'dist/**', 'artifacts/**', 'node_modules/**', 'previews/**', 'validation/**', 'web-dist/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.ts', 'tests/**/*.ts'],
    languageOptions: { globals: { document: 'readonly', window: 'readonly', navigator: 'readonly', localStorage: 'readonly', Blob: 'readonly', URL: 'readonly', HTMLCanvasElement: 'readonly', ImageData: 'readonly', requestAnimationFrame: 'readonly', cancelAnimationFrame: 'readonly', performance: 'readonly', ResizeObserver: 'readonly', MediaQueryList: 'readonly' } },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },
  {
    files: ['electron/**/*.cjs', 'scripts/**/*.mjs'],
    languageOptions: { globals: { process: 'readonly', __dirname: 'readonly', require: 'readonly', Buffer: 'readonly', URL: 'readonly', console: 'readonly', setTimeout: 'readonly', clearTimeout: 'readonly', window: 'readonly', document: 'readonly', HTMLElement: 'readonly', InputEvent: 'readonly', Event: 'readonly', requestAnimationFrame: 'readonly', getComputedStyle: 'readonly', innerWidth: 'readonly' } },
    rules: { '@typescript-eslint/no-require-imports': 'off' }
  }
);
