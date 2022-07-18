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
    align-items: center;
    margin: 0 1rem;
    display: flex;
    flex-direction: column;
  }

`;

const StyledContactInfo = styled.span<{id: string}>`
  width: 42px;
  height: 42px;
  cursor: pointer;
  -webkit-transition-property: all;
  -webkit-transition-duration: 0.3s;
  -webkit-transition-timing-function: ease;

  :hover {
    transform: scale(1.5);
  }
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  ${(props) => {
    var id = props.id;
    if (id == "LinkedIn") return `background-image: url("In-Blue-21@2x.png");`
    if (id == "Github") return `background-image: url("GitHub-Mark-64px.png");`
    if (id == "Email") return `background-image: url("gmail-icon-38472.png");`
    if (id == "Twitter") return `background-image: url("Twitter-logo-blue.png"); `
  }};
`; 

const ContactInfo = (props: {id: string}) => {
  var href = "";
  var id = props.id;
  if (id == "LinkedIn") {
    href = "https://www.linkedin.com/in/nhungluong/";
  }
  if (id == "Github") {
    href = "https://github.com/nhungL";
  }
  if (id == "Email") {
    href = "mailto:nhung.luong1098@gmail.com";
  }
  if (id == "Twitter") {
    href = "https://twitter.com/NhungLuong12";
  }

  return (
    <a className="link" href={href}>
      <p className="p">{id}</p>
      <StyledContactInfo id={id}/>
    </a>
  );
};

export const Footer = () => {
  return (
    <StyledFooter>
      <div>
        <p className="p-top">------ Created by Nhung Luong ------</p>
      </div>
      <div className="contact">
        <ul className="list">
          <ContactInfo id="LinkedIn"/>
          <ContactInfo id="Github"/>
          <ContactInfo id="Twitter"/>
          <ContactInfo id="Email"/>
          
        </ul>
      </div>
    </StyledFooter>
  );
};
