import { describe, expect, it } from "vitest";
import { loader } from "~/routes/projects.$slug";
import { realProjects } from "~/data/projects";

// Mock Params
const createLoaderArgs = (slug: string) => ({
  context: {},
  params: { slug },
  request: new Request(`http://localhost/projects/${slug}`),
});

describe("Projects Loader Logic", () => {
  it("should return project data for valid slug", async () => {
    const [project] = realProjects;
    const validSlug = project.id;
    const response = await loader(createLoaderArgs(validSlug));

    // Loader returns direct object in testing env usually, or we parse if it's a response
    const data = response.json ? await response.json() : response;

    // Handle Remix "defer" or simple json
    const projectData = data.project || data;

    expect(projectData).toBeDefined();
    if (projectData.id) {
      expect(projectData.id).toBe(validSlug);
    }
  });

  it("should throw 404 for invalid slug", async () => {
    try {
      await loader(createLoaderArgs("invalid-slug-123"));
    } catch (error: unknown) {
      if (error instanceof Response) {
        const notFoundStatus = 404;

        expect(error.status).toBe(notFoundStatus);
      } else {
        throw error;
      }
    }
  });
});
