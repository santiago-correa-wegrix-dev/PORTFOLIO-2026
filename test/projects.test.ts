import { describe, expect, it } from "vitest";
import { realProjects } from "~/data/projects";
import { loader } from "~/routes/projects.$slug";

const createLoaderArgs = (slug: string) => ({
  context: {},
  params: { slug },
  request: new Request(`http://localhost/projects/${slug}`),
});

describe("Projects Loader Logic", () => {
  it("should return project, prev and next for valid slug", async () => {
    const firstProject = realProjects[0];
    const secondProject = realProjects[1];

    const result = await loader(createLoaderArgs(secondProject.id));
    const data = result as { project: typeof secondProject; prev: typeof firstProject | null; next: typeof secondProject | null };

    expect(data.project).toBeDefined();
    expect(data.project.id).toBe(secondProject.id);
    expect(data.prev?.id).toBe(firstProject.id);
  });

  it("should return null prev for first project", async () => {
    const [first] = realProjects;
    const result = await loader(createLoaderArgs(first.id));
    const data = result as { prev: null };

    expect(data.prev).toBeNull();
  });

  it("should return null next for last project", async () => {
    const last = realProjects[realProjects.length - 1];
    const result = await loader(createLoaderArgs(last.id));
    const data = result as { next: null };

    expect(data.next).toBeNull();
  });

  it("should throw 404 for invalid slug", async () => {
    await expect(loader(createLoaderArgs("invalid-slug-123"))).rejects.toBeInstanceOf(Response);
  });
});
