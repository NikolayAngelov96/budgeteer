export function e(type, attributes, ...content) {
  const element = document.createElement(type);

  for (const key in attributes) {
    if (key.startsWith("on")) {
      element.addEventListener(key.slice(2), attributes[key]);
    } else {
      element[key] = attributes[key];
    }
  }

  for (const item of content) {
    element.append(item);
  }

  return element;
}

export const tr = e.bind(null, "tr", {});
export const td = e.bind(null, "td", {});
