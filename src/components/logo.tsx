import Image from "next/image"
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/">
        <Image
            src={'/logo.png'}
            alt="logo"
            width={200}
            height={200}
        />
    </Link>
  )
}

export default Logo
