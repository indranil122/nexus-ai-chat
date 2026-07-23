/**
 * NexusAI Chat - GitHub Changelog Integration
 */

export class ChangelogManager {
  constructor(repoPath) {
    this.repoPath = repoPath; // e.g., 'indranil122/nexus-ai-chat'
    this.apiUrl = `https://api.github.com/repos/${this.repoPath}/commits`;
    this.commits = [];
    this.isFetching = false;
  }

  async fetchLatestCommits(limit = 10) {
    if (this.isFetching) return this.commits;
    this.isFetching = true;

    try {
      const response = await fetch(`${this.apiUrl}?per_page=${limit}`);
      if (!response.ok) {
        throw new Error(`GitHub API returned ${response.status}`);
      }
      const data = await response.json();
      
      this.commits = data.map(commitObj => {
        return {
          sha: commitObj.sha,
          message: commitObj.commit.message,
          authorName: commitObj.commit.author.name,
          date: new Date(commitObj.commit.author.date),
          url: commitObj.html_url
        };
      });

      return this.commits;
    } catch (error) {
      console.error("Failed to fetch changelog:", error);
      return [];
    } finally {
      this.isFetching = false;
    }
  }

  // Format date to relative time (e.g., "2 hours ago")
  getRelativeTime(date) {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const daysDifference = Math.round((date - new Date()) / (1000 * 60 * 60 * 24));
    
    if (Math.abs(daysDifference) > 0) {
        return rtf.format(daysDifference, 'day');
    }
    
    const hoursDifference = Math.round((date - new Date()) / (1000 * 60 * 60));
    if (Math.abs(hoursDifference) > 0) {
        return rtf.format(hoursDifference, 'hour');
    }
    
    const minutesDifference = Math.round((date - new Date()) / (1000 * 60));
    return rtf.format(minutesDifference, 'minute');
  }

  // Build HTML for the timeline
  buildTimelineHTML() {
    if (!this.commits || this.commits.length === 0) {
      return `<div class="changelog-empty">No recent updates found or unable to connect to GitHub.</div>`;
    }

    let html = '<div class="changelog-timeline">';
    
    this.commits.forEach(commit => {
      const title = commit.message.split('\n')[0]; // Get first line of commit message
      let description = commit.message.substring(title.length).trim();
      if (description.length > 150) {
        description = description.substring(0, 150) + '...';
      }

      html += `
        <div class="changelog-item">
          <div class="changelog-marker"></div>
          <div class="changelog-content">
            <div class="changelog-header">
              <span class="changelog-date">${this.getRelativeTime(commit.date)}</span>
              <a href="${commit.url}" target="_blank" class="changelog-sha" title="View on GitHub">${commit.sha.substring(0, 7)}</a>
            </div>
            <h4 class="changelog-title">${this.escapeHtml(title)}</h4>
            ${description ? `<p class="changelog-desc">${this.escapeHtml(description)}</p>` : ''}
            <div class="changelog-author">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              ${this.escapeHtml(commit.authorName)}
            </div>
          </div>
        </div>
      `;
    });

    html += '</div>';
    return html;
  }

  escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}
