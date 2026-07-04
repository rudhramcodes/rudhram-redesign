import facebook from "feather-icons/dist/icons/facebook.svg?raw";
import instagram from "feather-icons/dist/icons/instagram.svg?raw";
import linkedin from "feather-icons/dist/icons/linkedin.svg?raw";

const icons = { Facebook: facebook, Instagram: instagram, LinkedIn: linkedin };

export default function SocialIcon({ platform }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex [&_svg]:size-5"
      dangerouslySetInnerHTML={{ __html: icons[platform] }}
    />
  );
}
