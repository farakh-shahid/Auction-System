export const setSessionParams = (accessToken: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', accessToken)
  }
}

export const authHeaders = () => {
  if (typeof window !== 'undefined') {
    return {
      accessToken: localStorage.getItem('accessToken')
    }
  }
}

export const apiHeaders = () => {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',

    Authorization: `Bearer ${authHeaders()?.accessToken}`
  }
}

//@ts-expect-error
export function updateArray(idToUpdate, updatedObject, arrayOfObjects) {
  console.log('idToUpdate', idToUpdate, 'updatedObject')
  arrayOfObjects = arrayOfObjects.map((obj: { id: any }) => {
    if (obj.id === idToUpdate) {
      return { ...obj, ...updatedObject }
    } else {
      return obj
    }
  })
}
