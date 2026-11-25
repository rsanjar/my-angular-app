// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@typescript-eslint/no-inferrable-types': 'off',
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: [
      'src/app/app.ts',
      'src/app/features/tasks/components/add-task-modal/add-task-modal.ts',
      'src/app/features/tasks/components/completed-user-task/completed-user-task.ts',
      'src/app/features/tasks/components/task-card/task-card.ts',
      'src/app/features/tasks/components/user-tasks/user-tasks.ts',
      'src/app/features/users/components/user-details/user-details.ts',
      'src/app/features/users/components/user-list/user-list.ts',
      'src/app/features/users/components/user-task/user-task.ts',
      'src/app/features/users/components/user/user.ts',
      'src/app/layout/header/header.ts',
    ],
    rules: {
      // Angular's v22 migration sets Eager to preserve these components' change detection.
      '@angular-eslint/prefer-on-push-component-change-detection': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {
      '@angular-eslint/template/alt-text': 'off',
    },
  },
]);
