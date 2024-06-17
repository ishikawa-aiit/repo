/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, TableCaption, TableProps, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'

export default {
  title: 'Chakra UI Components / Data Display / Table / Double Header',
}

const DoubleHeaderTable = (props: TableProps) => {
  return (
    <Table {...props}>
      <TableCaption>Imperial to metric conversion factors</TableCaption>
      <Thead>
        <Tr>
          <Th aria-hidden />
          <Th>To convert</Th>
          <Th>into</Th>
          <Th isNumeric>multiply by</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Th rowSpan={4}>Length</Th>
          <Td>inches</Td>
          <Td>millimetres (mm)</Td>
          <Td isNumeric>25.4</Td>
        </Tr>
        <Tr>
          <Td>feet</Td>
          <Td>centimetres (cm)</Td>
          <Td isNumeric>30.48</Td>
        </Tr>
        <Tr>
          <Td>yards</Td>
          <Td>metres (m)</Td>
          <Td isNumeric>0.91444</Td>
        </Tr>
        <Tr>
          <Td>miles</Td>
          <Td>kilometres (km)</Td>
          <Td isNumeric>1.61</Td>
        </Tr>
        <Tr>
          <Th rowSpan={4}>Area</Th>
          <Td>square inches</Td>
          <Td>sq. millimetres (mm²)</Td>
          <Td isNumeric>645</Td>
        </Tr>
        <Tr>
          <Td>square feet</Td>
          <Td>square metres (m²)</Td>
          <Td isNumeric>0.0929</Td>
        </Tr>
        <Tr>
          <Td>square yards</Td>
          <Td>square metres (m²)</Td>
          <Td isNumeric>0.836</Td>
        </Tr>
        <Tr>
          <Td>acres</Td>
          <Td>hectares</Td>
          <Td isNumeric>2.47</Td>
        </Tr>
        <Tr>
          <Th rowSpan={4}>Volume</Th>
          <Td>cubic inches</Td>
          <Td>millilitres (ml)</Td>
          <Td isNumeric>16.4</Td>
        </Tr>
        <Tr>
          <Td>cubic feet</Td>
          <Td>litres</Td>
          <Td isNumeric>28.3</Td>
        </Tr>
        <Tr>
          <Td>imperial gallons</Td>
          <Td>litres</Td>
          <Td isNumeric>4.55</Td>
        </Tr>
        <Tr>
          <Td>
            <abbr>US</abbr> barrels
          </Td>
          <Td>cubic metres (m³)</Td>
          <Td isNumeric>0.159</Td>
        </Tr>
      </Tbody>
      <Tfoot>
        <Tr>
          <Th aria-hidden />
          <Th>To convert</Th>
          <Th>into</Th>
          <Th isNumeric>multiply by</Th>
        </Tr>
      </Tfoot>
    </Table>
  )
}

export const Basic = () => {
  return <DoubleHeaderTable />
}
