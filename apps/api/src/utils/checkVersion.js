const parseVersionString = (versionString) => {
  return versionString.split('.').map(Number);
};

const isVersionGreaterThan = (versionA, versionB) => {
  const a = parseVersionString(String(versionA));
  const b = parseVersionString(String(versionB));

  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const aValue = a[i] || 0;
    const bValue = b[i] || 0;

    if (aValue !== bValue) {
      return aValue > bValue;
    }
  }

  return false; // Las versiones son iguales
};

module.exports = {
  parseVersionString,
  isVersionGreaterThan,
};
