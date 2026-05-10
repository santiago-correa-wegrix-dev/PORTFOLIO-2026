import { describe, expect, it } from "vitest";
import { realProjects } from "~/data/projects";
import { loader } from "~/routes/projects.$slug";

const mockArgs = (slug: string) =>
  ({
    context: {},
    params: { slug },
    request: new Request(`http://localhost/projects/${slug}`),
  }) as unknown as Parameters<typeof loader>[0];

describe("Projects Loader Logic", () => {
  it("should return project, prev and next for valid slug", () => {
    const [firstProject, secondProject] = realProjects;
    const result = loader(mockArgs(secondProject.id));

    expect(result.project.id).toBe(secondProject.id);
    expect(result.prev?.id).toBe(firstProject.id);
  });

  it("should return null prev for first project", () => {
    const [first] = realProjects;
    const result = loader(mockArgs(first.id));

    expect(result.prev).toBeNull();
  });

  it("should return null next for last project", () => {
    const last = realProjects.at(-1)!;
    const result = loader(mockArgs(last.id));

    expect(result.next).toBeNull();
  });

  it("should throw 404 for invalid slug", () => {
    let thrown: unknown;
    try {
      loader(mockArgs("invalid-slug-123"));
    } catch (error) {
      thrown = error;
    }
    expect(thrown).toMatchObject({ status: 404 });
  });
});
