import type { NextPage } from "next"
import { Stack, Title, Text, List } from "@mantine/core"
import { ListItem } from "@mantine/core/lib/List/ListItem/ListItem"
const FAQ: NextPage = () => {
  return (
    <Stack>
      <Stack>
        <Title order={3}>ตัด F ประมาณเท่าไหร่ครับ</Title>
        <Text>45 คะแนนจากคะแนนรวมทั้งหมด (ที่ปรับให้เต็ม 100)</Text>
      </Stack>

      <Stack>
        <Title order={3}>วิชานี้คิดเกรดอย่างไร</Title>
        <Text>
          คิดตามกลุ่มโดยใช้ ค่าเฉลี่ย (Mean) และส่วนเบี่ยงเบนมาตรฐาน (Standard
          Deviation) โดย ณ คะแนนเฉลี่ยนั้น ผู้เรียนถือว่ามีศักยภาพปานกลาง (C -
          C+) และก็จะเพิ่มขึ้นหรือลดลงตามค่าเบี่ยงเบนมาตรฐาน ตามลำดับ
        </Text>
      </Stack>

      <Stack>
        <Title order={3}>ถ้าอยากไปสหกิจต้องทำอย่างไรบ้าง</Title>
        <Text>สำหรับภาค IE นะครับ</Text>
        <List>
          <List.Item>
            นักศึกษามีหน่วยกิตที่ได้สะสมเทียบเท่านักศึกษาชั้นปีที่ 3
          </List.Item>
          <List.Item>เกรดเฉลี่ยสะสมไม่ต่ำกว่า 2.50</List.Item>
          <List.Item>
            กระบวนวิชาที่นักศึกษาต้องผ่านก่อนเข้ารับการปฏิบัติงานสหกิจ ได้แก่
            <List withPadding listStyleType="disc">
              <List.Item>255251 Motion and Time Study</List.Item>
              <List.Item>255290 IE Lab</List.Item>
              <List.Item>255321 Quality Control</List.Item>
              <List.Item>255330 Economy Engineering</List.Item>
              และได้รับลำดับขั้น (A-D) โดยเกรดเฉลี่ยของ 4 วิชาข้างต้น
              จะต้องไม่ต่ำกว่า 2.00 และ
            </List>
            <List withPadding listStyleType="disc">
              <List.Item>
                255316 Maintenance หรือ 255328 Plant Layout Design
              </List.Item>
              <List.Item>255337 Safety Engineering</List.Item>
              <List.Item>255340 Production Planning and Control</List.Item>
              <List.Item>
                255393 Introduction to Cooperative Education
              </List.Item>
              และได้รับลำดับขั้น (A-F)
            </List>
          </List.Item>
        </List>
      </Stack>
    </Stack>
  )
}
export default FAQ
