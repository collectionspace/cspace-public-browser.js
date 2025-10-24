/* global document */

export function throwAxeViolationsError(violations) {
  const violationMessages = violations.map(
    (violation) => `${violation.id}: ${violation.description} (${violation.nodes.length} nodes)`,
  ).join('\n');
  throw new Error(`Accessibility violations found:\n${violationMessages}`);
}

export function createTestContainer(context) {
  const titles = [];

  let current = context.currentTest;

  while (current) {
    titles.push(current.title);

    current = current.parent;
  }

  const title = document.createElement('p');
  title.textContent = titles.reverse().join(' ');

  const container = document.createElement('div');

  document.body.appendChild(title);
  document.body.appendChild(container);

  return container;
}
