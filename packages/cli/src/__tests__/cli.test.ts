import { execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

const CLI_PATH = path.resolve(__dirname, '../../dist/cli.js');

describe('DSAF CLI Integration Tests', () => {
  const runCommand = (args: string) => {
    try {
      return execSync(`node ${CLI_PATH} ${args}`, { encoding: 'utf8', stdio: 'pipe' });
    } catch (e: any) {
      return e.stderr || e.stdout;
    }
  };

  it('should print help information with no arguments', () => {
    const output = runCommand('');
    expect(output).toContain('Usage:');
    expect(output).toContain('fix [options] <target-dir>');
    expect(output).toContain('chat [options] <target-dir>');
    expect(output).toContain('export <input-json>');
    expect(output).toContain('parse-storybook <storybook-json>');
  });

  it('should error when export is run without a valid file', () => {
    const output = runCommand('export non_existent_file.json');
    expect(output).toContain('Error: Input file not found');
  });

  it('should error when parse-storybook is run without a valid file', () => {
    const output = runCommand('parse-storybook non_existent_storybook.json');
    expect(output).toContain('Error: Storybook file not found');
  });

  describe('Export functionality', () => {
    const testJsonPath = path.resolve(__dirname, 'test-audit.json');
    const expectedCsvPath = path.resolve(__dirname, 'test-audit.csv');

    beforeAll(() => {
      // Setup mock audit JSON
      const mockAudit = {
        score: 75,
        summary: "Test summary",
        violations: [
          { rule: "Color Contrast", description: "Text contrast is too low", file: "Button.tsx", line: 10 }
        ]
      };
      fs.writeFileSync(testJsonPath, JSON.stringify(mockAudit));
    });

    afterAll(() => {
      // Cleanup
      if (fs.existsSync(testJsonPath)) fs.unlinkSync(testJsonPath);
      if (fs.existsSync(expectedCsvPath)) fs.unlinkSync(expectedCsvPath);
    });

    it('should successfully convert an audit JSON into a CSV', () => {
      const output = runCommand(`export ${testJsonPath}`);
      expect(output).toContain('Exported 1 tickets');
      
      const csvContent = fs.readFileSync(expectedCsvPath, 'utf8');
      expect(csvContent).toContain('Summary,Description,Issue Type');
      expect(csvContent).toContain('[DSAF] Fix Color Contrast in Button.tsx');
    });
  });
});
