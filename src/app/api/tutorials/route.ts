// app/api/tutorials/route.ts
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    // 使用相对路径，避免重复的项目名
    // const tutorialsDir = path.join("src", "app", "data", "tutorials");
    // const tutorialsDir = "@/src/app/data/tutorials";
    const projectRoot = process.cwd();
    const tutorialsDir = path.join(projectRoot, "src", "data", "tutorials");
    console.log("Tutorials directory:", tutorialsDir);
    console.log("Project root:", projectRoot);

    const categoryDirs = await fs.readdir(tutorialsDir);

    const categories = await Promise.all(
      categoryDirs.map(async (categoryDir) => {
        const [name, icon] = categoryDir.split("-");
        const categoryPath = path.join(tutorialsDir, categoryDir);
        const files = await fs.readdir(categoryPath);

        const items = await Promise.all(
          files.map(async (file) => {
            const [itemName, description, keywordsStr] = file
              .replace(".md", "")
              .split("-");
            const keywords = keywordsStr.split(",").map((kw) => kw.trim());
            const content = await fs.readFile(
              path.join(categoryPath, file),
              "utf-8"
            );

            return {
              name: itemName,
              description,
              keywords,
              content,
            };
          })
        );

        return {
          name,
          icon,
          items,
        };
      })
    );

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error loading tutorials:", error);
    return NextResponse.json(
      { error: "Failed to load tutorials" },
      { status: 500 }
    );
  }
}
