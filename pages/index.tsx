import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import {
  Input,
  Container,
  Button,
  Stack,
  Group,
  Text,
  Title,
  Badge,
  Card,
  List,
  Divider,
} from "@mantine/core"
import { useState } from "react"
import { Formik, useFormikContext } from "formik"
import * as Yup from "yup"

const validationSchema = Yup.object().shape({
  midtermScore: Yup.number()
    .min(0, "Min 0%")
    .max(40, "Max 40%")
    .required("Required"),
  attendanceScore: Yup.number()
    .min(0, "Min 0%")
    .max(7, "Max 7%")
    .required("Required"),
  quizScore: Yup.number()
    .min(0, "Min 0%")
    .max(3, "Max 3%")
    .required("Required"),
  assignmentScore: Yup.number()
    .min(0, "Min 0%")
    .max(5, "Max 5%")
    .required("Required"),
})

interface FormValues {
  midtermScore: number
  attendanceScore: number
  quizScore: number
  assignmentScore: number
}

const Score = () => {
  const { values, errors, isValid, touched } = useFormikContext<FormValues>()

  const grade = calcGrade(
    values.midtermScore,
    values.attendanceScore,
    values.assignmentScore,
    values.quizScore
  )

  const isClean =
    touched && // 👈 null and undefined check
    Object.keys(touched).length === 0 &&
    Object.getPrototypeOf(touched) === Object.prototype

  // console.log({ errors, isValid, touched, isClean })
  return (
    <>
      {isValid && !isClean && (
        <Card shadow="xs" p="lg" radius="md" withBorder>
          <Stack spacing={"lg"}>
            <Group>
              <Text>ถ้าจะไม่ได้ F คุณต้องทำคะแนนสอบปลายภาคให้ได้อย่างน้อย</Text>
              <Badge color="indigo" size="xl">
                {grade.finalScoreNoF} / 45
              </Badge>
              <Text>คะแนน หรือ</Text>
              <Badge color="indigo" size="xl">
                {grade.finalPercentNoF}%
              </Badge>
              <Text>ของข้อสอบปลายภาค</Text>
            </Group>
            <Divider />
            <Group>
              <Text>ถ้าต้องตัดเกรดด้วยคะแนนสอบกลางภาคอย่างเดียวคุณจะได้เกรด</Text>
              <Badge size="xl" color="red">
                {grade.gradeLetter}
              </Badge>
            </Group>
          </Stack>
        </Card>
      )}
    </>
  )
}

const Home: NextPage = () => {
  const initialValues: FormValues = {
    midtermScore: 0,
    attendanceScore: 7,
    quizScore: 3,
    assignmentScore: 5,
  }

  return (
    <>
      <Stack mt={10}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnChange={true}
          onSubmit={() => { }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            resetForm,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <Stack spacing={"lg"}>
                <Title order={1} color="indigo">
                  Engineering Materials: Grade Estimator
                </Title>
                <Card shadow="xs" p="lg" radius="md" withBorder>
                  <Stack spacing={"xs"}>
                    <Title order={3}>Midterm Score</Title>
                    <Text color="gray">(0-40%)</Text>
                    <Input
                      type="number"
                      name="midtermScore"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.midtermScore}
                    />
                    <Text color="pink">
                      {errors.midtermScore &&
                        touched.midtermScore &&
                        errors.midtermScore}
                    </Text>
                  </Stack>
                  <Stack spacing={"xs"}>
                    <Title order={3}>Attendance Score</Title>
                    <Text color="gray">(0-7%)</Text>
                    <Input
                      type="number"
                      name="attendanceScore"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.attendanceScore}
                    />
                    <Text color="pink">
                      {errors.attendanceScore &&
                        touched.attendanceScore &&
                        errors.attendanceScore}
                    </Text>
                  </Stack>

                  <Stack spacing={"xs"}>
                    <Title order={3}>Quiz Score</Title>
                    <Text color="gray">(0-3%) ทำไปแล้ว 1.5% </Text>
                    <Input
                      type="number"
                      name="quizScore"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.quizScore}
                    />
                    <Text color="pink">
                      {errors.quizScore &&
                        touched.quizScore &&
                        errors.quizScore}
                    </Text>
                  </Stack>

                  <Stack spacing={"xs"}>
                    <Title order={3}>Assignment Score (0-5%)</Title>
                    <Text color="gray">ยังไม่ได้ให้ทำ</Text>
                    <Input
                      type="number"
                      name="assignmentScore"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.assignmentScore}
                    />
                    <Text color="pink">
                      {errors.assignmentScore &&
                        touched.assignmentScore &&
                        errors.assignmentScore}
                    </Text>
                  </Stack>
                </Card>

                <Score />
                <Group>
                  <Button onClick={() => resetForm()}>Reset</Button>
                </Group>
              </Stack>
            </form>
          )}
        </Formik>
      </Stack>
    </>
  )
}

export default Home

function calcGrade(
  midterm: number,
  attentdance: number,
  quiz: number,
  assignment: number
) {
  let finalScoreNoF = 45 - (midterm + attentdance + quiz + assignment)
  let finalPercentNoF = (finalScoreNoF / 45) * 100
  finalScoreNoF = Number((Math.round(finalScoreNoF * 100) / 100).toFixed(2))
  finalPercentNoF = Number((Math.round(finalPercentNoF * 100) / 100).toFixed(2))
  if (finalScoreNoF < 0) {
    finalScoreNoF = 0
    finalPercentNoF = 0
  }

  const mean_current = 50.890194
  const mean_target = 53.15
  const std_current = 11.016146
  const std_target = 8.59

  const totalScore = (midterm / 40) * 85 + 15
  const totalScoreAdjusted =
    mean_target + ((totalScore - mean_current) * std_target) / std_current

  let gradeLetter = ""
  if (totalScoreAdjusted > 68.23) {
    gradeLetter = "A"
  } else if (totalScoreAdjusted > 63.2) {
    gradeLetter = "B+"
  } else if (totalScoreAdjusted > 58.18) {
    gradeLetter = "B"
  } else if (totalScoreAdjusted > 53.15) {
    gradeLetter = "C+"
  } else if (totalScoreAdjusted > 48.12) {
    gradeLetter = "C"
  } else if (totalScoreAdjusted > 43.1) {
    gradeLetter = "D+"
  } else if (totalScoreAdjusted > 38.07) {
    gradeLetter = "D"
  } else {
    gradeLetter = "F"
  }

  return { gradeLetter, finalScoreNoF, finalPercentNoF }
}
