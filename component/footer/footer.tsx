import styled from "styled-components";
import Image from "next/image";

const StyledFooter = styled.footer<{}>`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  background-color: transparent;
  min-width: ;
  .p-top {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    text-shadow: 0px 0px 15px #680000;
  }
  .p {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
  }
  .list {
    padding: 0;
    display: flex;
    margin: 0;
  }
  .link {
    margin: 0 1rem;
    display: flex;
    flex-direction: column;
  }
`;
export const Footer = () => {
  return (
    <StyledFooter>
      <div>
        <p className="p-top">------ Created by Nhung Luong ------</p>
      </div>
      <div className="contact">
        <ul className="list">
          <a className="link" href="https://www.linkedin.com/in/nhungluong/">
            <p className="p">LinkedIn</p>
            <span>
              <Image
                className="icon"
                src="/In-Blue-21@2x.png"
                height="40rem"
                width="40rem"
              ></Image>
            </span>
          </a>
          <a className="link" href="https://github.com/nhungL">
            <p className="p">Github</p>
            <span>
              <Image
                className="icon"
                src="/GitHub-Mark-64px.png"
                height="40rem"
                width="40rem"
              ></Image>
            </span>
          </a>
          <a className="link" href="mailto:nhung.luong1098@gmail.com">
            <p className="p">Email</p>
            <span>
              <Image
                className="icon"
                src="/gmail-icon-38472.png"
                height="40rem"
                width="40rem"
              ></Image>
            </span>
          </a>
        </ul>
      </div>
    </StyledFooter>
  );
};
