import * as React from "react"
import styled from "styled-components"
import { Text } from "../base/index"

const Wrapper = styled(Text)`
    padding: 8px 16px;
    text-align: center;
    background-color: #555;
    color: white;
    font-size: 12px;
`

type Props = {
    show: number
    message?: string | null
}

export default (props: Props) => {
    const { show, message } = props
    const [ visible, setVisible ] = React.useState<boolean>(false)

    React.useEffect(() => {
        setVisible(true)
        setTimeout(() => {
            setVisible(false)
        }, 5000)
    }, [show])

    if(!show || !message) {
        return null
    }

    return visible ? (
        <Wrapper>{message}</Wrapper>
    ) : null
}