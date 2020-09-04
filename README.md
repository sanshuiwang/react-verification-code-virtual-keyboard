# react-verification-code-virtual-keyboard

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
![][travis-url]
[![Coverage Status][coverage-image]][coverage-url]
![][david-url]
![][dt-url]
[![code style: prettier][prettier-image]][prettier-url]
![][license-url]

Based on antd-mobile Modal, InputItem. Use css border-image instead of border. Developed a four-digit verification code input box with virtual keyboard and pasting functions.

## Install

### yarn

```bash
yarn add react-verification-code-virtual-keyboard
```

### npm

```bash
npm install --save react-verification-code-virtual-keyboard
```

### UMD

```javascript
<script src="https://unpkg.com/react-verification-code-virtual-keyboard@1.0.0/dist/react-verification-code-virtual-keyboard.umd.js"></script>
```

> Tips: You can find the library on window.ReactVerificationCodeVirtualKeyboard.

## Import

### ES2015

```javascript
import ReactVerificationCodeVirtualKeyboard from 'react-verification-code-virtual-keyboard'
```

### CommonJS

```javascript
const ReactVerificationCodeVirtualKeyboard = require('react-verification-code-virtual-keyboard')
```

## Usage

```javascript
import ReactVerificationCodeVirtualKeyboard from 'react-verification-code-virtual-keyboard'

function Example() {
  return (
    <ReactVerificationCodeVirtualKeyboard
      visible={true}
      onClose={() => {}}
      maskClosable={true}
      headerLeftContent={[<b key="X">X</b>]}
      headerTitle="验证码标题"
      headerRightContent={[]}
      tipMessage="验证码提示信息"
      onInputChange={() => {}}
      isCodeImmediatelySendVerify={true}
      onSendVerifyCode={() => {}}
    >
      {/** List only children or Null */}
    </ReactVerificationCodeVirtualKeyboard>
  )
}
```

### Params

| Property                    | Description                                                                                                    | Type                  | Default   | isRequired |
| --------------------------- | -------------------------------------------------------------------------------------------------------------- | --------------------- | --------- | ---------- |
| visible                     | Show Modal Verification Code UI                                                                                | boolean               | false     | true       |
| onClose                     | Close Modal Verification Code UI (Default clear countdown)                                                     | function              | undefined | true       |
| maskClosable                | Whether the mask layer of modal is clickable                                                                   | boolean               | true      | false      |
| headerLeftContent           | Left half of head                                                                                              | JSX.Element[]         | []        | false      |
| headerTitle                 | title                                                                                                          | JSX.Element \| string |
| '请输入验证码'              | false                                                                                                          |
| headerRightContent          | Right half of head                                                                                             | JSX.Element[]         | []        | false      |
| tipMessage                  | Tips                                                                                                           | JSX.Element \| string | '验证码'  | false      |
| onInputChange               | Input Box handle change value                                                                                  | function              | undefined | false      |
| isCodeImmediatelySendVerify | Whether to send the verification code immediately when the modal pops up                                       | boolean               | false     | false      |
| onSendVerifyCode            | If the isCodeImmediatelySendVerify value is true, auto excute onSendVerifyCode. 点击获取验证码，将执行此函数。 | function              | undefined | true       |

## LICENSE

[GPL v3 License](https://raw.githubusercontent.com/sanshuiwang/react-verification-code-virtual-keyboard/master/LICENSE)

[npm-url]: https://npmjs.org/package/react-verification-code-virtual-keyboard
[npm-image]: https://badge.fury.io/js/react-verification-code-virtual-keyboard.png
[travis-image]: https://www.travis-ci.org/sanshuiwang/react-verification-code-virtual-keyboard.svg?branch=master
[travis-url]: https://travis-ci.com/sanshuiwang/react-verification-code-virtual-keyboard
[coverage-image]: https://coveralls.io/repos/github/sanshuiwang/react-verification-code-virtual-keyboard/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/sanshuiwang/react-verification-code-virtual-keyboard
[david-url]: https://david-dm.org/sanshuiwang/react-verification-code-virtual-keyboard.png
[dt-url]: https://img.shields.io/npm/dt/react-verification-code-virtual-keyboard.svg
[license-url]: https://img.shields.io/npm/l/react-verification-code-virtual-keyboard.svg
[prettier-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[prettier-url]: https://github.com/prettier/prettier
