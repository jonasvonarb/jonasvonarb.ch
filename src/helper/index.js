import { marked } from "marked";

const truncate = (str, length) => {
  if (!str) return;
  if (str.length > length) {
    return str.slice(0, length) + "...";
  } else return str;
};

const arrayToTree = (list, parent = 0) => {
  return list
    .filter((item) => {
      return item.parent === parent && item["arcotex:tag_category"] == "Tag";
    })
    .map((child) => {
      return { ...child, children: arrayToTree(list, child["@id"]) };
    });
};

const mToH = (source) => {
  if (!source) return;

  var renderer = new marked.Renderer();

  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  renderer.link = function (href, title, text) {
    let host = window.location.host.replace("www.", "");

    var pathArray = href.split("/");
    let protocol = pathArray[0];
    let targetHost = pathArray[2].replace("www.", "");

    let target = targetHost !== host ? "_blank" : "_self";
    // return `<a target="${target}" href="${href}" title="${text}" class="link">${text}<img class="svg-inline--fa fa-arrow-up-right cursor-pointer icon" src="/assets/arrowUp.svg" /></a>`;
    return `<a target="${target}" href="${href}" title="${text}" class="link">${text}</a>`;
  };

  return marked(source, { renderer: renderer });
};

export { truncate, arrayToTree, mToH };
