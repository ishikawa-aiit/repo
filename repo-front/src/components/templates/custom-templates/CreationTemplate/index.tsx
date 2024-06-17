import { Box, Center, Input, Select } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FC, memo, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'

import {
  templateTextareaProps,
  templateInputProps,
  modelSentences,
  isSharedProp,
  explainSentences,
  customTemplateSelectProp,
} from './constants'
import { CustomTemplateType } from './type'
import { templateValidationSchema } from './validator'

import { Button, FormControl, Textarea, Switch } from '@/components/molecules'
import { DefaultLayout, ModelSentenceLayout } from '@/components/organisms'
import { user as userState } from '@/contexts/global/atoms/User'
import { usePostCustomTemplate } from '@/hooks/api'

export const CreationTemplate: FC<CustomTemplateType.Props> = memo(({ customTemplates, ...props }) => {
  const { mutate } = usePostCustomTemplate()
  const [user] = useRecoilState(userState)
  const [isSwitchChecked, setIsSwitchChecked] = useState(false)

  useEffect(() => {
    if (customTemplates.length > 0) {
      setIsSwitchChecked(!!customTemplates[0].team)
    }
  }, [customTemplates])

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors, isValid },
    trigger,
  } = useForm<CustomTemplateType.Inputs>({
    defaultValues: {
      isShared: isSwitchChecked,
    },
    mode: 'all',
    resolver: yupResolver(templateValidationSchema),
  })

  const onSubmit = (values: CustomTemplateType.Inputs) => {
    values.id ??= null
    mutate(values)
  }

  const onChange = (value: string) => {
    const valueId = !value ? null : +value
    const template = customTemplates.find((customTemplate) => {
      return customTemplate.id === valueId
    })

    if (!template) {
      return
    }
    const { team, ...rest } = template
    const templateInput: CustomTemplateType.Inputs = { ...rest, isShared: !!team }
    clearErrors()
    ;(Object.keys(templateInput) as (keyof CustomTemplateType.Inputs)[]).forEach(async (key) => {
      if (!valueId && key === 'name') {
        return setValue(key, '')
      }
      if (key === 'isShared') {
        setIsSwitchChecked(templateInput.isShared)
      }
      setValue(key, templateInput[key] ?? '')
    })
  }

  return (
    <DefaultLayout heading="テンプレートを作成・編集する" innerWidth="100%" {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModelSentenceLayout modelSentences={modelSentences} explainSentences={explainSentences}>
          <Box gridArea="top_left">
            <Box as="p" mb={12}>
              テンプレートを作成することで、週報を作成する際にテンプレートの内容から週報を書き始めることができます。
              先生から週報の書き方に指定があった際に、そのフォーマットをテンプレートとして登録しておくと便利です。
            </Box>
          </Box>
          <Box gridArea="selectTemplate_left">
            <FormControl label={customTemplateSelectProp.label} isRequired={false} w="100%">
              <Select
                data-cy={`Select_${customTemplateSelectProp.name}`}
                data-testid={`Select_${customTemplateSelectProp.name}`}
                {...(register(customTemplateSelectProp.name),
                {
                  onChange: (e) => {
                    onChange(e.target.value)
                  },
                })}
              >
                {customTemplates.map(({ id, name }, index) => {
                  return (
                    <option value={id ?? ''} key={index}>
                      {name}
                    </option>
                  )
                })}
              </Select>
            </FormControl>
          </Box>
          <Box gridArea="shareSwitch_left">
            {user?.team !== null && (
              <FormControl label={isSharedProp.label} isRequired={false} isInline={true} w="fit-content">
                <Switch
                  {...(register(isSharedProp.name),
                  {
                    onChange: (e) => {
                      onChange(e.target.value)
                    },
                  })}
                  data-testid={`Switch_${isSharedProp.name}`}
                  data-cy={`Switch_${isSharedProp.name}`}
                  isChecked={isSwitchChecked}
                  onChange={() => {
                    const toggle = !isSwitchChecked
                    setValue('isShared', toggle)
                    setIsSwitchChecked(toggle)
                    trigger('isShared')
                  }}
                />
              </FormControl>
            )}
          </Box>
          {templateInputProps.map((inputProp, index) => {
            return (
              <Box gridArea={`${inputProp.name}_left`} key={index}>
                <FormControl label={inputProp.label} error={errors[inputProp.name]}>
                  <Input
                    placeholder={inputProp.placeholder}
                    {...register(inputProp.name)}
                    data-testid={`Input_${inputProp.name}`}
                  />
                </FormControl>
              </Box>
            )
          })}
          {templateTextareaProps.map((textareaProp, index) => {
            return (
              <Box w="100%" gridArea={`${textareaProp.name}_left`} key={index}>
                <FormControl label={textareaProp.label} isRequired={false} error={errors[textareaProp.name]}>
                  <Textarea
                    placeholder={textareaProp.placeholder}
                    {...register(textareaProp.name)}
                    data-testid={`TextArea_${textareaProp.name}`}
                  />
                </FormControl>
              </Box>
            )
          })}

          <Box gridArea="button_left">
            <Center>
              <Button type="submit" isDisabled={!isValid}>
                保存する
              </Button>
            </Center>
          </Box>
        </ModelSentenceLayout>
      </form>
    </DefaultLayout>
  )
})
