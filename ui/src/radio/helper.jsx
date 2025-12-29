export async function songFromRadio(radio) {
  if (!radio) {
    return undefined
  }

  // Prefer explicit imageUrl field if provided (supports local public path or external link)
  let cover = 'internet-radio-icon.svg'
  if (radio.imageUrl) {
    try {
      const url = new URL(radio.imageUrl, window.location.origin)
      await resourceExists(url)
      cover = url.toString()
    } catch {
      // ignore and fallback to favicon behavior below
    }
  } else {
    try {
      const url = new URL(radio.homePageUrl ?? radio.streamUrl)
      url.pathname = '/favicon.ico'
      await resourceExists(url)
      cover = url.toString()
    } catch {
      // ignore
    }
  }

  return {
    ...radio,
    title: radio.name,
    album: radio.homePageUrl || radio.name,
    artist: radio.name,
    cover,
    isRadio: true,
  }
}

const resourceExists = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = function () {
      resolve(url)
    }
    img.onerror = function () {
      reject('not found')
    }
    img.src = url
  })
}
