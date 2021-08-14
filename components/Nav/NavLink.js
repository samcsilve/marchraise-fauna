import { Link } from '@chakra-ui/react'
import * as React from 'react'

export const NavLink = (props) => {
  const { isActive, ...rest } = props
  return (
    <Link
      display="block"
      py={2}
      px={3}
      borderRadius="md"
      transition="all 0.3s"
      fontWeight="medium"
      lineHeight="1.25rem"
      aria-current={isActive ? 'page' : undefined}
      _hover={{
        bg: "gray.100",
      }}
      _activeLink={{
        bg: "blue.600",
        color: "#fff",
      }}
      {...rest}
    />
  )
}