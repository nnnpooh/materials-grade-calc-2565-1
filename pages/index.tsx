import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Input, Container, Button, Stack, Group, Alert, Text, Title } from '@mantine/core';
import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({
  midtermScore: Yup.number()
    .min(0, 'Min 0%')
    .max(40, 'Max 40%')
    .required('Required'),
  attendanceScore: Yup.number()
    .min(0, 'Min 0%')
    .max(7, 'Max 7%')
    .required('Required'),
  quizScore: Yup.number()
    .min(0, 'Min 0%')
    .max(3, 'Max 3%')
    .required('Required'),
  assignmentScore: Yup.number()
    .min(0, 'Min 0%')
    .max(5, 'Max 5%')
    .required('Required'),
});


const Home: NextPage = () => {


  return (<>

    <Container>


      <Formik
        initialValues={{
          midtermScore: 0,
          attendanceScore: 7,
          quizScore: 3,
          assignmentScore: 5
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          const grade = calcGrade(values.midtermScore, values.attendanceScore, values.assignmentScore, values.quizScore)
          console.log({ values, grade })
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          resetForm
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>

            <Stack spacing={'lg'}>

              <Stack spacing={'xs'}>
                <Title order={3}>
                  Midterm Score (0-40%)
                </Title>
                <Input
                  type="number"
                  name="midtermScore"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.midtermScore}
                />
                <Text color="pink">
                  {errors.midtermScore && touched.midtermScore && errors.midtermScore}
                </Text>

              </Stack>

              <Stack spacing={'xs'}>
                <Title order={3}>
                  Attendance Score (0-7%)
                </Title>
                <Input
                  type="number"
                  name="attendanceScore"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.attendanceScore}
                />
                <Text color="pink">
                  {errors.attendanceScore && touched.attendanceScore && errors.attendanceScore}
                </Text>
              </Stack>


              <Stack spacing={'xs'}>
                <Title order={3}>
                  Quiz Score (0-3%)
                </Title>
                <Input
                  type="number"
                  name="quizScore"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.quizScore}
                />
                <Text color="pink">
                  {errors.quizScore && touched.quizScore && errors.quizScore}
                </Text>
              </Stack>


              <Stack spacing={'xs'}>
                <Title order={3}>
                  Assignment Score (0-5%)
                </Title>
                <Text color='gray'>To be assgined.</Text>
                <Input
                  type="number"
                  name="assignmentScore"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.assignmentScore}
                />
                <Text color="pink">
                  {errors.assignmentScore && touched.assignmentScore && errors.assignmentScore}
                </Text>
              </Stack>


              <Group>
                <Button type="submit" disabled={isSubmitting} color='indigo'>
                  Submit
                </Button>
                <Button onClick={() => resetForm()} color='gray'>
                  Reset
                </Button>
              </Group>
            </Stack>

          </form>
        )}
      </Formik>
    </Container>
  </>
  )
}

export default Home

function calcGrade(midterm: number, attentdance: number, quiz: number, assignment: number) {

  let finalScoreNoF = (45 - (midterm + attentdance + quiz + assignment)) / 45

  if (finalScoreNoF < 0) {
    finalScoreNoF = 0
  }

  const mean_current = 50.890194
  const mean_target = 53.15
  const std_current = 11.016146
  const std_target = 8.59

  const totalScore = (midterm / 40 * 85) + 15
  const totalScoreAdjusted = mean_target + (totalScore - mean_current) * std_target / std_current

  let gradeLetter = ''
  if (totalScoreAdjusted > 68.23) {
    gradeLetter = 'A'
  }
  else if (totalScoreAdjusted > 63.20) {
    gradeLetter = 'B+'
  }
  else if (totalScoreAdjusted > 58.18) {
    gradeLetter = 'B'
  }
  else if (totalScoreAdjusted > 53.15) {
    gradeLetter = 'C+'
  }
  else if (totalScoreAdjusted > 48.12) {
    gradeLetter = 'C'
  }
  else if (totalScoreAdjusted > 43.10) {
    gradeLetter = 'D+'
  }
  else if (totalScoreAdjusted > 38.07) {
    gradeLetter = 'D'
  }
  else {
    gradeLetter = 'F'
  }

  return { gradeLetter, finalScoreNoF }
}