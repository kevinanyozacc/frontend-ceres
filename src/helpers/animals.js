export const getIconByAnimalSpecies = type => {
  const iconsMap = {
    'POR': 'mdi:pig',
    'BOV': 'mdi:cow',
  }
  return iconsMap[type] || 'mdi:help'
}

export const getIconByAnimalGender = type => {
  const iconsMap = {
    'H': 'mdi:gender-female',
    'M': 'mdi:gender-male',
  }
  return iconsMap[type] || 'mdi:help'
}

export const getAnimalGender = gender => {
  const genderMap = {
    'H': 'Hembra',
    'M': 'Macho',
  }
  return genderMap[gender] || 'No especificado'
}