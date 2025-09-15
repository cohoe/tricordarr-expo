import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { NumberValidation } from '@tricordarr/libraries/ValidationSchema';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useStyles } from '@tricordarr/components/Context/Contexts/StyleContext';
import { PrimaryActionButton } from '@tricordarr/components/Buttons/PrimaryActionButton';
import { BoardgameRecommendationData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { BoardgameNumPlayersPickerField } from '@tricordarr/components/Forms/Fields/Boardgames/BoardgameNumPlayersPickerField';
import { BoardgameAgePickerField } from '@tricordarr/components/Forms/Fields/Boardgames/BoardgameAgePickerField';
import { BoardgameDurationPickerField } from '@tricordarr/components/Forms/Fields/Boardgames/BoardgameDurationPickerField';
import { BoardgameComplexityPickerField } from '@tricordarr/components/Forms/Fields/Boardgames/BoardgameComplexityPickerField';

interface PersonalEventFormProps {
  onSubmit: (values: BoardgameRecommendationData, helpers: FormikHelpers<BoardgameRecommendationData>) => void;
  initialValues: BoardgameRecommendationData;
  buttonText?: string;
}

const validationSchema = Yup.object().shape({
  numPlayers: NumberValidation,
  timeToPlay: NumberValidation,
  maxAge: NumberValidation,
  complexity: NumberValidation,
});

export const BoardgameRecommendationForm = ({
  onSubmit,
  initialValues,
  buttonText = 'Recommend Games',
}: PersonalEventFormProps) => {
  const { commonStyles } = useStyles();

  const styles = StyleSheet.create({
    buttonContainer: commonStyles.marginTopSmall,
    fieldContainer: commonStyles.paddingBottom,
  });

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit, values, isSubmitting, isValid }) => (
        <View>
          <View style={styles.fieldContainer}>
            <BoardgameNumPlayersPickerField value={values.numPlayers} />
          </View>
          <View style={styles.fieldContainer}>
            <BoardgameAgePickerField value={values.maxAge} />
          </View>
          <View style={styles.fieldContainer}>
            <BoardgameDurationPickerField value={values.timeToPlay} />
          </View>
          <BoardgameComplexityPickerField value={values.complexity} />
          <View style={styles.fieldContainer} />
          <PrimaryActionButton
            disabled={isSubmitting || !isValid}
            isLoading={isSubmitting}
            viewStyle={styles.buttonContainer}
            onPress={handleSubmit}
            buttonText={buttonText}
          />
        </View>
      )}
    </Formik>
  );
};
