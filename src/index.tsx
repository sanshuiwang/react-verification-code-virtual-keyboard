import React, { useCallback, useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Modal, InputItem } from 'antd-mobile'
import classnames from 'classnames'
import _ from 'lodash'
import countdown from 'count-down-ts'

import CloseSvg from './static/close.svg'
import DeleteSvg from './static/delete.svg'

import styles from './index.less'
import stylesCss from './index.css'
//stylesCss border image 实现border太粗情况

const NUMBER_KEYBOARD = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [null, 0, 'delete'],
]

interface IProps {
  visible: boolean // 展示弹框
  onClose: Function // 关闭弹框事件
  maskClosable?: boolean // 点击遮罩层是否关闭弹框
  headerLeftContent?: JSX.Element[] // 标题左半部分
  headerTitle?: JSX.Element | string // 标题
  headerRightContent?: JSX.Element[] // 标题右半部分
  tipMessage?: JSX.Element | string // 提示信息
  onInputChange?: Function // 输入值change监听
  isCodeImmediatelySendVerify?: boolean // 弹出弹框是否进行立即发送验证码
  onSendVerifyCode: Function // isCodeImmediatelySendVerify为true时自动执行
}
/**TIPS:
 * 1. 另外向父组件的ref属性输出clearInput方法
 *  */
function VerificationCode(props: IProps, ref: any): JSX.Element | null {
  const {
    visible,
    onClose,
    maskClosable = true,
    headerLeftContent = [],
    headerTitle = '请输入验证码',
    headerRightContent = [],
    tipMessage = '验证码',
    onInputChange,
    isCodeImmediatelySendVerify = false,
    onSendVerifyCode,
  } = props

  if (visible === false) {
    return null
  }

  const [inputFocus, setInputFocus] = useState<boolean[]>([true, false, false, false])
  const [inputValue, setInputValue] = useState<number[]>([])
  const [isCodeImmediatelySendVerifySelf, setIsCodeImmediatelySendVerifySelf] = useState<boolean>(
    isCodeImmediatelySendVerify
  )
  const [countdownNum, setCountdownNum] = useState<number>()

  useEffect(() => {
    /**
     * 1. 执行发送验证码函数
     * 2. 进行倒计时
     * */
    if (isCodeImmediatelySendVerifySelf) {
      onSendVerifyCode && onSendVerifyCode()
      countdown.start(59, 0, (c) => {
        setCountdownNum(c)
        if (c === 0) {
          setIsCodeImmediatelySendVerifySelf(false)
        }
      })
    }
  }, [isCodeImmediatelySendVerifySelf, setCountdownNum, onSendVerifyCode])

  useImperativeHandle(
    ref,
    () => ({
      clearInput: () => {
        setInputFocus([true, false, false, false])
        setInputValue([])
        onInputChange && onInputChange([])
      },
    }),
    [setInputFocus, setInputValue, onInputChange]
  )

  const onKeyBoardClick = useCallback(
    (keyboard) => {
      if (keyboard === null) {
        return
      }

      let inputFocusInit = [false, false, false, false]
      let inputValueClone = _.cloneDeep(inputValue)
      /**删除一个值 */
      if (keyboard === 'delete') {
        inputValueClone.pop()
        const inputValueCloneLens = inputValueClone.length
        inputFocusInit[inputValueCloneLens] = true
        setInputValue(inputValueClone)
        setInputFocus(inputFocusInit)
        onInputChange && onInputChange(inputValueClone)
        return
      }
      /**加入新值 */
      if (inputValue.length < 4) {
        inputValueClone.push(keyboard)
        const inputValueCloneLens = inputValueClone.length
        inputFocusInit[inputValueCloneLens] = true
        setInputValue(inputValueClone)
        setInputFocus(inputFocusInit)
        onInputChange && onInputChange(inputValueClone)
      }
    },
    [inputValue, onInputChange]
  )

  const inputOnChange = useCallback(
    (val: string) => {
      if (val === '' || isNaN(Number(val))) {
        return
      }

      let inputFocusInit = [false, false, false, false]
      let inputValueClone = _.cloneDeep(inputValue)
      const inputValueCloneLens = inputValueClone.length
      for (let i = inputValueCloneLens, j = 0; i < 4; i++, j++) {
        inputValueClone[i] = Number(val[j])
      }
      const inputValueCloneLensPaste = inputValueClone.length
      inputFocusInit[inputValueCloneLensPaste] = true
      setInputValue(inputValueClone)
      setInputFocus(inputFocusInit)
      onInputChange && onInputChange(inputValueClone)
    },
    [inputValue, onInputChange]
  )

  const inputPreventSystemKeyboard = useCallback(() => {
    ;(document.activeElement as HTMLElement).blur()
  }, [])

  const handleOnClose = useCallback(() => {
    countdown.clear()
    onClose && onClose()
  }, [onClose])

  return (
    <Modal
      className={styles.modalWrapper}
      popup
      visible={visible}
      onClose={handleOnClose}
      maskClosable={maskClosable}
      animationType="slide-up"
    >
      <header className={classnames(styles.header, stylesCss.borderBottomLine)}>
        <div className={styles.left}>
          {headerLeftContent.length > 0 ? (
            headerLeftContent.map((item) => item)
          ) : (
            <img src={CloseSvg} className={styles.closeSvg} key="closeSvg" onClick={handleOnClose} alt="" />
          )}
        </div>
        <h3 className={styles.title}>{headerTitle}</h3>
        <div className={styles.right}>{headerRightContent.map((item) => item)}</div>
      </header>

      <section className={styles.verifyWrapper}>
        <p className={styles.tips}>{tipMessage}</p>

        <ul className={styles.boxWrapper}>
          <li className={classnames({ [styles.focus]: inputFocus[0] })}>
            {inputValue[0]}
            <InputItem
              value=""
              disabled={!inputFocus[0]} //根据拥有的值个数，判断具有值不启用输入框
              className={classnames(styles.inputWrapper)}
              type="text"
              onChange={(val) => {
                /**系统粘贴功能造成的change, 自然就有了黏贴一串数字到每个输入框功能 */
                inputOnChange(val)
              }}
              onClick={() => {
                /**阻止弹出系统键盘, 点击就失去焦点 */
                inputPreventSystemKeyboard()
              }}
            />
          </li>
          <li className={classnames({ [styles.focus]: inputFocus[1] })}>
            {inputValue[1]}
            <InputItem
              value=""
              disabled={!inputFocus[1]}
              className={classnames(styles.inputWrapper)}
              type="text"
              onChange={(val) => {
                inputOnChange(val)
              }}
              onClick={() => {
                inputPreventSystemKeyboard()
              }}
            />
          </li>
          <li className={classnames({ [styles.focus]: inputFocus[2] })}>
            {inputValue[2]}
            <InputItem
              value=""
              disabled={!inputFocus[2]}
              className={classnames(styles.inputWrapper)}
              type="text"
              onChange={(val) => {
                inputOnChange(val)
              }}
              onClick={() => {
                inputPreventSystemKeyboard()
              }}
            />
          </li>
          <li className={classnames({ [styles.focus]: inputFocus[3] })}>
            {inputValue[3]}
            <InputItem
              value=""
              disabled={!inputFocus[3]}
              className={classnames(styles.inputWrapper)}
              type="text"
              onChange={(val) => {
                inputOnChange(val)
              }}
              onClick={() => {
                inputPreventSystemKeyboard()
              }}
            />
          </li>
        </ul>

        <div className={classnames(styles.verifyCodeBtn)}>
          {isCodeImmediatelySendVerifySelf ? (
            `重新获取验证码(${countdownNum}s)`
          ) : (
            <div
              className={styles.verifyCodeSendBtn}
              onClick={() => {
                /**自动执行获取验证码 */
                setIsCodeImmediatelySendVerifySelf(true)
              }}
            >
              获取验证码
            </div>
          )}
        </div>
      </section>

      <footer className={styles.footer}>
        {NUMBER_KEYBOARD.map((item, index) => {
          return (
            <ul key={index} className={classnames(styles.eachLine, stylesCss.borderTopLine)}>
              <li
                className={stylesCss.borderRightLine}
                onClick={() => {
                  onKeyBoardClick(item[0])
                }}
              >
                {item[0] === null ? '' : item[0]}
              </li>
              <li
                className={stylesCss.borderRightLine}
                onClick={() => {
                  onKeyBoardClick(item[1])
                }}
              >
                {item[1]}
              </li>
              <li
                onClick={() => {
                  onKeyBoardClick(item[2])
                }}
              >
                {item[2] === 'delete' ? <img src={DeleteSvg} className={styles.deleteSvg} alt="" /> : item[2]}
              </li>
            </ul>
          )
        })}
      </footer>
    </Modal>
  )
}

export default forwardRef(VerificationCode)
