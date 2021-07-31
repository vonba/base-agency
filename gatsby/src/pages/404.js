import React, { useContext } from "react"
import LocaleContext from "../components/LocaleContext"
import { tr } from "../utils/translations"

const NotFoundPage = () => {
  const [locale] = useContext(LocaleContext);
  return <p>{tr('messages', 'errorNotFound', locale)}</p>
}

export default NotFoundPage
