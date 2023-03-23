import { Layout } from "antd"
import "./styles.css"

const { Content } = Layout

function Page({children}){
    return(
        <>
            <Content className="Content">
                {children}
            </Content>
        </>
    )
}

export default Page;