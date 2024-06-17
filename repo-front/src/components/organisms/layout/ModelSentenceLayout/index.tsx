import { Grid, Box, Text, Heading } from '@chakra-ui/react'
import sizes from '@chakra-ui/theme/foundations/sizes'
import { FC, memo } from 'react'

import { ModelSentenceLayoutType } from './type'

/**
 * 例文付き2カラムレイアウト
 */
export const ModelSentenceLayout: FC<ModelSentenceLayoutType.Props> = memo(
  ({ children, modelSentences, explainSentences = [] }) => {
    // グリッド領域を作る, 例：
    // top_left top_right
    // activityTime_left activityTime_right
    // doneActivity_left doneActivity_right
    // ...
    // button_left button_right
    const templateAreas = [
      "'top_left top_right'",
      ...explainSentences.map((sentence) => {
        return `'${sentence.name}_left ${sentence.name}_right'`
      }),
      ...modelSentences.map((sentence) => {
        return `'${sentence.name}_left ${sentence.name}_right'`
      }),
      "'button_left button_right'",
    ]

    return (
      <Grid
        gridTemplateColumns={`${sizes['2xl']} auto`}
        templateAreas={`${templateAreas.join(' ')}`}
        rowGap={8}
        columnGap={8}
      >
        {children}
        {explainSentences.map((sentence, index) => {
          const text = (
            <Text whiteSpace="pre-wrap" color="neutral.500" fontWeight="normal">
              {sentence.explainSentence}
            </Text>
          )
          return (
            <Box gridArea={`${sentence.name}_right`} pt={8} key={index}>
              {sentence.explainSentence !== '' && text}
            </Box>
          )
        })}
        {modelSentences.map((sentence, index) => {
          const text = (
            <>
              <Heading color="neutral.500" fontWeight="normal" fontSize="inherit">
                例)
              </Heading>
              <Text whiteSpace="pre-wrap" color="neutral.500" fontWeight="normal">
                {sentence.modelSentence}
              </Text>
            </>
          )
          return (
            <Box gridArea={`${sentence.name}_right`} pt={8} key={index}>
              {sentence.modelSentence !== '' && text}
            </Box>
          )
        })}

        <Box gridArea="button_right" />
      </Grid>
    )
  },
)
