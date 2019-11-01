import {
  AnimationClassNames,
  getGlobalClassNames,
  HighContrastSelector,
  IStyle,
  normalize,
  getPlaceholderStyles,
  IconFontSizes
} from '../../Styling';
import { ILabelStyles, ILabelStyleProps } from '../../Label';
import { ITextFieldStyleProps, ITextFieldStyles } from './TextField.types';
import { IStyleFunctionOrObject } from '@uifabric/utilities';

const globalClassNames = {
  root: 'ms-TextField',
  description: 'ms-TextField-description',
  errorMessage: 'ms-TextField-errorMessage',
  field: 'ms-TextField-field',
  fieldGroup: 'ms-TextField-fieldGroup',
  prefix: 'ms-TextField-prefix',
  suffix: 'ms-TextField-suffix',
  wrapper: 'ms-TextField-wrapper',

  multiline: 'ms-TextField--multiline',
  borderless: 'ms-TextField--borderless',
  underlined: 'ms-TextField--underlined',
  unresizable: 'ms-TextField--unresizable',

  required: 'is-required',
  disabled: 'is-disabled',
  active: 'is-active'
};

function getLabelStyles(props: ITextFieldStyleProps): IStyleFunctionOrObject<ILabelStyleProps, ILabelStyles> {
  const { underlined, disabled, focused, theme } = props;
  const { palette, fonts } = theme;

  return () => ({
    root: [
      underlined &&
        disabled && {
          color: palette.neutralTertiary
        },
      underlined && {
        fontSize: fonts.medium.fontSize,
        marginRight: 8,
        paddingLeft: 12,
        paddingRight: 0,
        lineHeight: '22px',
        height: 32
      },
      underlined &&
        focused && {
          selectors: {
            [HighContrastSelector]: {
              height: 31 // -1px to prevent jumpiness in HC with the increased border-width to 2px
            }
          }
        }
    ]
  });
}

export function getStyles(props: ITextFieldStyleProps): ITextFieldStyles {
  const {
    theme,
    className,
    disabled,
    focused,
    required,
    multiline,
    hasLabel,
    borderless,
    underlined,
    hasIcon,
    resizable,
    hasErrorMessage,
    inputClassName,
    autoAdjustHeight
  } = props;

  const { semanticColors, effects, fonts } = theme;

  const classNames = getGlobalClassNames(globalClassNames, theme);

  const fieldPrefixSuffix: IStyle = {
    background: semanticColors.disabledBackground, // Suffix/Prefix are not editable so the disabled slot perfectly fits.
    color: !disabled ? semanticColors.inputPlaceholderText : semanticColors.disabledText,
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    flexShrink: 0
  };

  // placeholder style constants
  const placeholderStyles: IStyle = [
    fonts.medium,
    {
      color: semanticColors.inputPlaceholderText,
      opacity: 1
    }
  ];

  const disabledPlaceholderStyles: IStyle = {
    color: semanticColors.disabledText
  };

  return {
    root: [
      classNames.root,
      fonts.medium,
      required && classNames.required,
      disabled && classNames.disabled,
      focused && classNames.active,
      multiline && classNames.multiline,
      borderless && classNames.borderless,
      underlined && classNames.underlined,
      normalize,
      {
        position: 'relative'
      },
      className
    ],
    wrapper: [
      classNames.wrapper,
      underlined && {
        display: 'flex',
        selectors: {
          ':after': {
            pointerEvents: 'none',
            content: "''",
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            borderWidth: '0px 0px 1px 0px',
            borderBottomStyle: 'solid',
            borderBottomColor: semanticColors.inputBorder,
            width: '100%'
          }
        }
      },
      hasErrorMessage &&
        underlined &&
        !disabled && {
          selectors: {
            ':hover': {
              selectors: {
                [HighContrastSelector]: {
                  borderBottomColor: 'Highlight'
                },
                ':after': {
                  borderBottomColor: semanticColors.errorText
                }
              }
            }
          }
        },
      underlined &&
        disabled && {
          borderBottomColor: semanticColors.disabledBackground
        },
      underlined &&
        !disabled &&
        !focused &&
        !hasErrorMessage && {
          borderBottomColor: semanticColors.inputBorderHovered,
          selectors: {
            ':hover': {
              selectors: {
                [HighContrastSelector]: {
                  borderBottomColor: 'Highlight'
                },
                ':after': {
                  borderBottomColor: semanticColors.inputBorderHovered
                }
              }
            }
          }
        },
      underlined &&
        focused && {
          selectors: {
            ':after': {
              borderBottomColor: !hasErrorMessage ? semanticColors.inputFocusBorderAlt : semanticColors.errorText,
              borderBottomWidth: 2
            },
            [HighContrastSelector]: {
              borderBottomWidth: 2,
              borderBottomColor: 'Highlight'
            }
          }
        }
    ],
    fieldGroup: [
      classNames.fieldGroup,
      normalize,
      {
        background: semanticColors.inputBackground,
        cursor: 'text',
        height: 32,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        position: 'relative',
        selectors: {
          ':hover': {
            selectors: {
              ':after': {
                borderColor: semanticColors.inputBorderHovered
              },
              [HighContrastSelector]: {
                selectors: {
                  ':after': {
                    borderColor: 'Highlight'
                  }
                }
              }
            }
          }
        }
      },
      !underlined && {
        selectors: {
          ':after': {
            pointerEvents: 'none',
            content: "''",
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            border: `1px solid ${semanticColors.inputBorder}`,
            borderRadius: effects.roundedCorner2
          }
        }
      },
      multiline && {
        minHeight: '60px',
        height: 'auto',
        display: 'flex'
      },
      borderless && {
        selectors: {
          ':after': {
            border: 'none'
          }
        }
      },
      focused && {
        selectors: {
          ':after': {
            borderColor: semanticColors.inputFocusBorderAlt,
            borderWidth: '2px'
          },
          ':hover': {
            selectors: {
              ':after': {
                borderColor: semanticColors.inputFocusBorderAlt,
                borderWidth: '2px'
              }
            }
          },
          [HighContrastSelector]: {
            borderWidth: 2,
            borderColor: 'Highlight'
          }
        }
      },
      disabled && {
        selectors: {
          ':after': {
            borderColor: semanticColors.disabledBackground
          },
          ':hover': {
            selectors: {
              ':after': {
                borderColor: semanticColors.disabledBackground
              }
            }
          }
        },

        cursor: 'default'
      },
      underlined && {
        flex: '1 1 0px',
        border: 'none',
        textAlign: 'left'
      },
      underlined &&
        focused && {
          selectors: {
            [HighContrastSelector]: {
              height: 31 // -1px to prevent jumpiness in HC with the increased border-width to 2px
            }
          }
        },
      underlined &&
        disabled && {
          backgroundColor: 'transparent'
        },
      hasErrorMessage && {
        selectors: {
          ':after': {
            borderColor: semanticColors.errorText
          },
          '&:focus, &:': {
            selectors: {
              ':after': {
                borderColor: semanticColors.errorText
              }
            }
          }
        }
      },
      hasErrorMessage &&
        focused && {
          selectors: {
            ':after': {
              borderColor: semanticColors.errorText
            }
          }
        },
      !hasLabel &&
        required && {
          selectors: {
            ':before': {
              content: `'*'`,
              color: semanticColors.errorText,
              position: 'absolute',
              top: -5,
              right: -10
            },
            [HighContrastSelector]: {
              selectors: {
                ':after': {
                  right: -14 // moving the * 4 pixel to right to alleviate border clipping in HC mode.
                }
              }
            }
          }
        }
    ],
    field: [
      fonts.medium,
      classNames.field,
      normalize,
      {
        borderRadius: 0,
        border: 'none',
        background: 'none',
        backgroundColor: 'transparent',
        color: semanticColors.inputText,
        padding: '0 8px',
        width: '100%',
        minWidth: 0,
        textOverflow: 'ellipsis',
        outline: 0,
        selectors: {
          '&:active, &:focus, &:hover': { outline: 0 },
          '::-ms-clear': {
            display: 'none'
          }
        }
      },
      getPlaceholderStyles(placeholderStyles),
      multiline &&
        !resizable && [
          classNames.unresizable,
          {
            resize: 'none'
          }
        ],
      multiline && {
        minHeight: 'inherit',
        lineHeight: 17,
        flexGrow: 1,
        paddingTop: 6,
        paddingBottom: 6,
        overflow: 'auto',
        width: '100%'
      },
      multiline &&
        autoAdjustHeight && {
          overflow: 'hidden'
        },
      hasIcon && {
        paddingRight: 24,
        paddingBottom: 9
      },
      multiline &&
        hasIcon && {
          paddingRight: 40
        },
      disabled && [
        {
          backgroundColor: semanticColors.disabledBackground,
          color: semanticColors.disabledText,
          selectors: {
            ':after': {
              borderColor: semanticColors.disabledBackground
            }
          }
        },
        getPlaceholderStyles(disabledPlaceholderStyles)
      ],
      underlined && {
        textAlign: 'left'
      },
      focused &&
        !borderless && {
          selectors: {
            [HighContrastSelector]: {
              paddingLeft: 11,
              paddingRight: 11
            }
          }
        },
      focused &&
        multiline &&
        !borderless && {
          selectors: {
            [HighContrastSelector]: {
              paddingTop: 4 // take into consideration the 2px increased border-width (not when borderless).
            }
          }
        },
      inputClassName
    ],
    icon: [
      multiline && {
        paddingRight: 24,
        paddingBottom: 8,
        alignItems: 'flex-end'
      },
      {
        pointerEvents: 'none',
        position: 'absolute',
        bottom: 5,
        right: 8,
        top: 'auto',
        fontSize: IconFontSizes.medium,
        lineHeight: 18
      },
      disabled && {
        color: semanticColors.disabledText
      }
    ],
    description: [
      classNames.description,
      {
        color: semanticColors.bodySubtext,
        fontSize: fonts.xSmall.fontSize
      }
    ],
    errorMessage: [
      classNames.errorMessage,
      AnimationClassNames.slideDownIn20,
      fonts.small,
      {
        color: semanticColors.errorText,
        margin: 0,
        paddingTop: 5,
        display: 'flex',
        alignItems: 'center'
      }
    ],
    prefix: [classNames.prefix, fieldPrefixSuffix],
    suffix: [classNames.suffix, fieldPrefixSuffix],
    subComponentStyles: {
      label: getLabelStyles(props)
    }
  };
}
