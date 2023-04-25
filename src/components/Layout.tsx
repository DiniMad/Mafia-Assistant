import React, {PropsWithChildren} from "react";
import tw from "twin.macro";

type LayoutProps = PropsWithChildren & {
    pageTitle: string,
    bottomMenu: React.ReactNode
}
const Layout = ({pageTitle, children, bottomMenu}: LayoutProps) => {
    return (
        <LayoutComponent>
            <Title>{pageTitle}</Title>
            <Content>{children}</Content>
            <Menu>{bottomMenu}</Menu>
        </LayoutComponent>
    );
};

const LayoutComponent = tw.div`flex flex-col h-full`;

const Title = tw.h1`flex justify-center items-center text-3xl text-white h-[8%] bg-background-300 border-b-2 border-background-400`;

const Content = tw.div`h-[84%]`;

const Menu = tw.div`flex justify-center items-center px-2 h-[8%] bg-background-300`;

export default Layout;