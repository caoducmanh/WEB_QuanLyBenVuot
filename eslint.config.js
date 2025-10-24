//  ESLint 9 Flat Config cho React 22 (JavaScript thuần, Yarn v4)
//  Cấu hình code sạch, đồng nhất, hiệu năng cao và tránh lỗi phổ biến

import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  js.configs.recommended,

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
  },

  {
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      prettier,
    },

    rules: {
      ...react.configs.recommended.rules,

      //  REACT RULES -------------------------------------------------------------
      'react/react-in-jsx-scope': 'off', //  Không cần import React ở đầu file
      'react/jsx-uses-react': 'off', //  Ngăn lỗi “React must be in scope” trong JSX
      'react/prop-types': 'off', //  Tắt kiểm tra PropTypes (nếu không dùng TypeScript)
      'react/jsx-boolean-value': ['warn', 'never'], //  Viết <Button disabled /> thay vì <Button disabled={true} />
      'react/jsx-curly-brace-presence': ['warn', 'never'], //  Tránh viết {“text”} thừa trong JSX
      'react/self-closing-comp': 'warn', //  Bắt buộc tự đóng tag khi không có children (<img />)
      'react/jsx-key': 'error', //  Phải có key trong mảng render (map)
      'react/no-unescaped-entities': 'off', //  Cho phép ký tự đặc biệt như ’ hoặc “ trong JSX
      'react/no-unknown-property': ['error', { ignore: ['css'] }], //  Báo lỗi nếu viết sai tên thuộc tính DOM
      'react/jsx-no-useless-fragment': 'warn', //  Không dùng <> </> thừa
      'react/no-array-index-key': 'warn', //  Không dùng index làm key trong map() (gây bug render)
      'react/no-danger': 'warn', //  Cảnh báo khi dùng dangerouslySetInnerHTML
      'react/no-direct-mutation-state': 'error', //  Không thay đổi trực tiếp this.state
      'react/no-access-state-in-setstate': 'error', //  Không đọc state ngay trong setState()
      'react/jsx-no-duplicate-props': 'error', //  Không được khai báo prop trùng tên

      //  REACT HOOKS RULES -------------------------------------------------------
      'react-hooks/rules-of-hooks': 'error', //  Không được gọi Hook trong vòng lặp/điều kiện
      'react-hooks/exhaustive-deps': 'warn', //  Cảnh báo thiếu dependencies trong useEffect()

      //  ACCESSIBILITY (A11Y) RULES ---------------------------------------------
      'jsx-a11y/alt-text': 'warn', //  <img> phải có alt (tránh lỗi cho người dùng screen reader)
      'jsx-a11y/anchor-is-valid': 'warn', //  <a> phải có href hợp lệ
      'jsx-a11y/no-autofocus': 'off', //  Cho phép autofocus (nếu cần UX)
      'jsx-a11y/no-static-element-interactions': 'off', //  Cho phép onClick trên div/span
      'jsx-a11y/click-events-have-key-events': 'warn', //  Nếu có click → nên có key event (accessibility)

      //  IMPORT RULES ------------------------------------------------------------
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ], //  Giữ thứ tự import, thêm dòng trống giữa nhóm
      'import/no-duplicates': 'warn', //  Không import trùng module
      'import/no-unresolved': 'off', //  Tắt check alias Vite
      'import/no-named-as-default': 'off', //  Cho phép export default trùng tên

      //  LOGIC & SAFETY ----------------------------------------------------------
      'no-console': ['error', { allow: ['warn', 'error'] }], //  Cấm console.log trong production
      'no-debugger': 'error', //  Cấm debugger
      'no-alert': 'warn', //  Không dùng alert/confirm trong app
      'no-useless-return': 'warn', //  Xóa return thừa
      'no-extra-boolean-cast': 'warn', //  Tránh viết !!a khi không cần
      'no-unneeded-ternary': 'warn', //  Không viết toán tử 3 ngôi dư thừa
      'no-unsafe-optional-chaining': 'error', //  Ngăn lỗi khi ?. bị dùng sai vị trí

      // CODE STYLE --------------------------------------------------------------
      'arrow-body-style': ['warn', 'as-needed'], //  Dùng arrow function 1 dòng gọn gàng
      'object-shorthand': ['warn', 'always'], // Dùng shorthand {x} thay vì {x: x}
      'prefer-template': 'warn', //  Dùng template string thay vì nối chuỗi
      'prefer-arrow-callback': 'warn', //  Ưu tiên arrow function trong callback
      'func-style': ['warn', 'declaration', { allowArrowFunctions: true }], //  Đồng nhất kiểu khai báo hàm
      'spaced-comment': ['warn', 'always', { exceptions: ['-'] }], //  Comment phải có khoảng trắng sau //

      //  COMPLEXITY & MAINTAINABILITY --------------------------------------------
      complexity: ['warn', { max: 10 }], //  Cảnh báo function quá phức tạp (quá 10 nhánh)
      'max-depth': ['warn', 4], //  Cảnh báo lồng if quá sâu
      'max-lines': ['warn', 300], //  Cảnh báo file quá dài
      'max-lines-per-function': ['warn', 100], //  Cảnh báo function quá dài
      'max-params': ['warn', 5], //  Quá nhiều tham số trong 1 hàm

      // 🧹 CODE QUALITY ------------------------------------------------------------
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Biến bắt đầu bằng _ không báo unused
      'no-var': 'error', //  Cấm var
      'prefer-const': 'warn', //  Dùng const nếu biến không đổi
      eqeqeq: ['error', 'always'], //  Phải dùng === thay vì ==
      curly: ['error', 'all'], //  Luôn có ngoặc nhọn với if/else/for

      //  ASYNC & PROMISE ---------------------------------------------------------
      'require-await': 'warn', //  Cảnh báo async function không có await
      'no-return-await': 'warn', //  Không cần return await

      //  PRETTIER FORMAT ---------------------------------------------------------
      'prettier/prettier': [
        'error',
        {
          singleQuote: true, //  Dùng nháy đơn '
          semi: true, //  Có dấu ;
          trailingComma: 'es5', // Dấu phẩy cuối object/array
          printWidth: 100, //  Giới hạn chiều rộng dòng
          tabWidth: 2, //  Dấu tab = 2 khoảng
          bracketSpacing: true, //  Có khoảng giữa { a: 1 }
        },
      ],

      // Cấm import sâu (deep import) theo mẫu này, để tránh bundle nặng và mất tree-shaking-----------------------------
      'no-restricted-imports': [
        'error', // Mức độ cảnh báo
        {
          patterns: ['@mui/*/*/*'], // Cấm import sâu từ @mui (chỉ cho phép import cấp root)
        },
      ],
    },

    //  Tự động phát hiện version React đang dùng
    settings: {
      react: { version: 'detect' },
    },
  },
];
